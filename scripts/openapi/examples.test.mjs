import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

const execute = promisify(execFile);
const guides = await Promise.all(['', '.en', '.zh-Hant'].map(suffix => readFile(`content/docs/open-api/examples${suffix}.mdx`, 'utf8')));
function snippet(guide, title) {
  const block = guide.match(new RegExp('```python title="' + title.replaceAll('.', '\\.') + '"\\n([\\s\\S]*?)\\n```'));
  assert.ok(block, `Missing executable example: ${title}`);
  return block[1];
}
const rss = snippet(guides[0], 'conditional_rss_poll.py');
const deletion = snippet(guides[0], 'delete_and_wait.py');

test('all locales publish identical executable examples', async () => {
  for (const guide of guides) {
    assert.equal(snippet(guide, 'conditional_rss_poll.py'), rss);
    assert.equal(snippet(guide, 'delete_and_wait.py'), deletion);
  }
  await execute('python3', ['-c', 'import ast,sys; ast.parse(sys.argv[1])', rss]);
  await execute('python3', ['-c', 'import ast,sys; ast.parse(sys.argv[1])', deletion]);
});

async function fixture(t, handler) {
  const directory = await mkdtemp(join(tmpdir(), 'anibt-wiki-api-example-'));
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => {
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    await rm(directory, { recursive: true });
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  const run = async code => {
    try {
      const result = await execute('python3', ['-c', code], {
        cwd: directory,
        env: { ...process.env, FEED_URL: `${base}/feed`, ANIBT_BASE_URL: base, RELEASE_ID: 'rel_example', ANIBT_API_KEY: 'local-example-test-key' },
        timeout: 15_000,
      });
      return { code: 0, ...result };
    } catch (error) {
      return { code: error.code, stdout: error.stdout, stderr: error.stderr };
    }
  };
  return { directory, run };
}

test('RSS example downloads the body and reuses it only after an actual 304', async t => {
  const xml = '<?xml version="1.0"?><rss version="2.0"><channel><title>Example</title></channel></rss>';
  let calls = 0;
  const { directory, run } = await fixture(t, (request, response) => {
    calls++;
    if (calls === 1) {
      assert.equal(request.method, 'GET');
      assert.equal(request.headers['if-none-match'], undefined);
      response.writeHead(200, { 'content-type': 'application/xml', etag: '"v1"' });
      response.end(xml);
    } else {
      assert.equal(request.headers['if-none-match'], '"v1"');
      response.writeHead(304); response.end();
    }
  });
  assert.equal((await run(rss)).code, 0);
  assert.equal(await readFile(join(directory, 'feed.xml'), 'utf8'), xml);
  assert.equal((await run(rss)).code, 0);
  assert.equal(await readFile(join(directory, 'feed.xml'), 'utf8'), xml);
  assert.equal(calls, 2);
});

test('RSS errors do not replace the saved body or advance its ETag', async t => {
  const { directory, run } = await fixture(t, (_request, response) => {
    response.writeHead(503); response.end('Unavailable');
  });
  await writeFile(join(directory, 'feed.xml'), 'previous body');
  await writeFile(join(directory, 'feed.etag'), '"previous"');
  assert.notEqual((await run(rss)).code, 0);
  assert.equal(await readFile(join(directory, 'feed.xml'), 'utf8'), 'previous body');
  assert.equal(await readFile(join(directory, 'feed.etag'), 'utf8'), '"previous"');
});

test('deletion example follows 202 with status reads and handles a temporary 429', async t => {
  let calls = 0;
  const { run } = await fixture(t, (request, response) => {
    calls++;
    assert.equal(request.method, calls === 1 ? 'DELETE' : 'GET');
    response.setHeader('Retry-After', '1');
    if (calls === 2) { response.writeHead(429); response.end('Too many requests'); return; }
    response.writeHead(calls === 1 ? 202 : 200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ ok: true, result: { state: calls === 1 ? 'pending' : 'completed' } }));
  });
  const result = await run(deletion);
  assert.equal(result.code, 0, result.stderr);
  assert.match(result.stdout, /Deletion completed/);
  assert.equal(calls, 3);
});

for (const [name, status, body] of [
  ['scope denial', 403, { ok: false, error: { code: 'INSUFFICIENT_SCOPE' } }],
  ['repeat delete not found', 404, { ok: false, error: { code: 'NOT_FOUND' } }],
  ['cleanup failure', 500, { ok: false, error: { code: 'RELEASE_DELETION_FAILED', details: { state: 'failed' } } }],
  ['failed receipt', 200, { ok: true, result: { state: 'failed', failure: { code: 'RELEASE_DELETION_FAILED' } } }],
  ['malformed success', 200, '<html>Not a receipt</html>'],
]) {
  test(`deletion example stops on ${name}`, async t => {
    let calls = 0;
    const { run } = await fixture(t, (_request, response) => {
      calls++; response.writeHead(status); response.end(typeof body === 'string' ? body : JSON.stringify(body));
    });
    assert.notEqual((await run(deletion)).code, 0);
    assert.equal(calls, 1, 'an error must not become endless pending polls');
  });
}
