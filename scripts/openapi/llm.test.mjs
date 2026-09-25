import assert from 'node:assert/strict';
import test from 'node:test';
import { getOperationDocument } from '../../lib/openapi-document.ts';
import { openapi } from '../../lib/openapi.ts';
import { contractValidator, loadContract, operations } from './check.mjs';

const { document, fixtures } = await loadContract();

test('every standalone LLM contract validates the same recorded responses and requests', () => {
  for (const { path, method, operation } of operations(document)) {
    const fragment = getOperationDocument(operation.operationId, { machineOnly: true });
    assert.ok(fragment);
    assert.equal(fragment.info.title, 'AniBT Open API');
    assert.equal(fragment.info.version, '1');
    const validator = contractValidator(fragment);
    for (const fixture of fixtures.filter(item => item.path === path && item.method === method)) validator.response(fixture);
  }
});

test('language filtering preserves schema property names and all example payloads', () => {
  for (const { operation } of operations(document)) {
    const original = getOperationDocument(operation.operationId);
    const fragment = getOperationDocument(operation.operationId, { machineOnly: true });
    function compare(source, result, trail = []) {
      if (!source || typeof source !== 'object') return;
      if (Array.isArray(source)) {
        source.forEach((item, index) => compare(item, result[index], [...trail, index]));
        return;
      }
      for (const [key, value] of Object.entries(source)) {
        const path = [...trail, key];
        if (['properties', 'patternProperties', '$defs'].includes(key)) {
          assert.deepEqual(Object.keys(result[key]), Object.keys(value), `${operation.operationId}: ${path.join('/')}`);
        }
        if (['example', 'examples', 'default', 'const', 'enum'].includes(key)) {
          assert.deepEqual(result[key], value, `${operation.operationId}: example or literal was changed`);
          continue;
        }
        if (typeof value === 'object' && value !== null) {
          assert.ok(result[key], `${operation.operationId}: structural node ${path.join('/')} removed`);
          compare(value, result[key], path);
        }
      }
    }
    compare(original, fragment);
  }
});

test('required title fields and optional description inputs remain in machine-readable schemas', () => {
  const fragment = getOperationDocument('other-releases-publish', { machineOnly: true });
  const input = fragment.components.schemas.PublishOtherJson;
  assert.equal(input.properties.title.type, 'string');
  assert.equal(input.properties.description.type, 'string');
  assert.ok(input.required.includes('title'));
  assert.equal(fragment.paths['/api/other-releases/publish'].post.description, undefined);
});

test('loading the interactive renderer cannot mutate the canonical LLM contract', async () => {
  const before = structuredClone(getOperationDocument('me', { machineOnly: true }));
  await openapi.getSchemas();
  const after = getOperationDocument('me', { machineOnly: true });
  assert.equal(after.openapi, '3.1.0');
  assert.deepEqual(after, before);
});
