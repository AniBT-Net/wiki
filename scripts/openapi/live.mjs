import assert from 'node:assert/strict';
import { contractValidator, loadContract } from './check.mjs';

const { document, fixtures } = await loadContract();
const { response: validateResponse } = contractValidator(document);
const origin = process.env.ANIBT_API_ORIGIN ?? 'https://anibt.net';
const routes = [...new Map(fixtures.filter(f => f.source.kind === 'production-read' && f.method === 'get')
  .filter(f => f.source.requestPath && !f.source.requestPath.includes('key=') && !f.source.requestPath.includes('token='))
  .map(f => [f.source.requestPath, f])).values()];
const version = await fetch(new URL('/api/version', origin), { signal: AbortSignal.timeout(20_000) });
assert.ok(version.ok, `Cannot identify API version: HTTP ${version.status}`);
const { gitSha } = await version.json();
const conditionalNames = new Set(['groups', 'bgm', 'season', 'anime-groups', 'rss-anime', 'rss-group', 'rss-magnets', 'rss-other']);
let conditionalChecks = 0;
for (const fixture of routes) {
  const result = await fetch(new URL(fixture.source.requestPath, origin), {
    headers: { 'User-Agent': 'AniBT-Wiki-Contract-Check/1.0' },
    redirect: 'manual', signal: AbortSignal.timeout(30_000),
  });
  assert.equal(result.status, fixture.status, `${fixture.name}: expected HTTP ${fixture.status}, got ${result.status}`);
  const contentType = result.headers.get('content-type')?.split(';')[0];
  const raw = await result.text();
  assert.ok(raw.length <= 3_000_000, `${fixture.name}: oversized response`);
  const body = contentType === 'application/json' ? JSON.parse(raw) : raw;
  validateResponse({ ...fixture, status: result.status, contentType, body });
  if (fixture.status >= 400 || fixture.name.startsWith('torznab-')) {
    assert.match(result.headers.get('cache-control') ?? '', /no-store/u, `${fixture.name}: private/error cache contract changed`);
  }
  if (conditionalNames.has(fixture.name)) {
    const etag = result.headers.get('etag');
    assert.ok(etag, `${fixture.name}: documented ETag is missing`);
    const head = await fetch(new URL(fixture.source.requestPath, origin), { method: 'HEAD', signal: AbortSignal.timeout(20_000) });
    assert.equal(head.status, 200, `${fixture.name}: HEAD failed`);
    assert.equal(await head.text(), '', `${fixture.name}: HEAD has a body`);
    const conditional = await fetch(new URL(fixture.source.requestPath, origin), { headers: { 'If-None-Match': etag }, signal: AbortSignal.timeout(20_000) });
    if (conditional.status === 304) {
      assert.equal(await conditional.text(), '', `${fixture.name}: 304 has a body`);
      conditionalChecks++;
    } else {
      assert.equal(conditional.status, 200, `${fixture.name}: conditional request failed`);
      assert.notEqual(conditional.headers.get('etag'), etag, `${fixture.name}: unchanged ETag returned 200`);
      await conditional.body?.cancel();
    }
  }
  console.log(`${fixture.name}: HTTP ${result.status}, ${contentType}, pass`);
}
const redirect = await fetch(new URL('/rss/magnets.xml?limit=100', origin), { redirect: 'manual', signal: AbortSignal.timeout(20_000) });
assert.equal(redirect.status, 308, 'RSS default limit must redirect to the canonical URL');
assert.equal(new URL(redirect.headers.get('location'), origin).pathname + new URL(redirect.headers.get('location'), origin).search, '/rss/magnets.xml');
await redirect.body?.cancel();
console.log(`Live read-only contract check: ${routes.length} response cases, ${conditionalNames.size} HEAD checks, ${conditionalChecks} observed 304s, one canonical redirect; AniBT ${gitSha}. Private success and write paths require isolated handler verification.`);
