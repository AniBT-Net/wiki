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
  console.log(`${fixture.name}: HTTP ${result.status}, ${contentType}, pass`);
}
console.log(`Live read-only contract check: ${routes.length} GET requests; AniBT ${gitSha}. Private success and write paths require isolated handler verification.`);
