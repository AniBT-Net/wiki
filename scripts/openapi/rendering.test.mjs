import assert from 'node:assert/strict';
import test from 'node:test';
import { responseExampleCode } from '../../lib/response-example.ts';
import { loadContract } from './check.mjs';

const { fixtures } = await loadContract();

test('XML response examples retain their exact bytes instead of JSON quotes and escapes', () => {
  for (const fixture of fixtures.filter(f => f.contentType.includes('xml'))) {
    const rendered = responseExampleCode(fixture.contentType, fixture.body);
    assert.equal(rendered.lang, 'xml');
    assert.equal(rendered.code, fixture.body);
    assert.ok(rendered.code.startsWith('<?xml'));
  }
});

test('plain-text errors and JSON objects keep their correct representation', () => {
  assert.deepEqual(responseExampleCode('text/plain', 'Missing RSS key'), { lang: 'text', code: 'Missing RSS key' });
  const sample = { ok: true, title: 'quotes " and newline\n', data: { sites: [] } };
  assert.deepEqual(JSON.parse(responseExampleCode('application/json', sample).code), sample);
});
