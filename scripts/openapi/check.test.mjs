import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { contractValidator, loadContract } from './check.mjs';

const { document, fixtures } = await loadContract();
const validator = contractValidator(document);
const sample = name => structuredClone(fixtures.find(fixture => fixture.name === name));

test('all captured production and isolated HTTP responses satisfy the contract', () => {
  for (const fixture of fixtures) validator.response(fixture);
});

test('sync regressions cannot turn sites into platform keys or overall into an object', () => {
  const fixture = sample('sync-not-started');
  fixture.body.data.overall = {};
  assert.throws(() => validator.response(fixture));
  fixture.body.data.overall = 'not_started';
  fixture.body.data.mikan = fixture.body.data.sites[0];
  delete fixture.body.data.sites;
  assert.throws(() => validator.response(fixture));
});

test('valid nullable catalog fields remain valid and wrong scalar types are rejected', () => {
  const fixture = sample('bgm');
  const item = fixture.body.data[0];
  for (const key of ['nameCn', 'date', 'image', 'rating', 'totalEpisodes']) item[key] = null;
  validator.response(fixture);
  item.rating = 'unknown';
  assert.throws(() => validator.response(fixture));
});

test('publish and preview envelopes cannot be interchanged', () => {
  const fixture = sample('publish-anime');
  delete fixture.body.result.revision;
  assert.throws(() => validator.response(fixture));
  const preview = sample('publish-preview');
  preview.body = { ok: true, result: preview.body };
  assert.throws(() => validator.response(preview));
});

test('deletion state and terminal receipt fields must agree', () => {
  const completed = sample('deletion-status-completed');
  delete completed.body.result.completedAt;
  assert.throws(() => validator.response(completed));
  const pending = sample('deletion-status-pending');
  pending.body.result.failedAt = 1;
  assert.throws(() => validator.response(pending));
});

test('documented request examples reject invented aliases and missing magnet input', () => {
  const fixture = sample('publish-anime');
  fixture.request.anime = { source: 'bgm', id: '543360' };
  assert.throws(() => validator.response(fixture));
  delete fixture.request.anime;
  delete fixture.request.magnetBase64;
  assert.throws(() => validator.response(fixture));
});

test('a response changed to the wrong content type is not accepted', () => {
  const fixture = sample('rss-private-missing');
  fixture.contentType = 'application/json';
  assert.throws(() => validator.response(fixture));
});

test('season rating scale and timestamp unit match the executed catalog adapter', async () => {
  const witness = JSON.parse(await readFile('openapi/fixtures/season-semantics.json', 'utf8'));
  const schema = document.components.schemas.SeasonAnimeItem;
  assert.equal(schema.properties.airingAt['x-unit'], 'unix-seconds');
  assert.equal(witness.result.airingAt, witness.input.airingSchedule[0].airingAt);
  assert.equal(new Date(witness.result.airingAt * 1000).getUTCFullYear(), 2026);
  assert.equal(schema.properties.rating['x-scale-maximum'], 10);
  assert.equal(witness.result.rating, witness.input.averageScore / 10);
});
