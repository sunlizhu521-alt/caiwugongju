import assert from 'node:assert/strict';
import test from 'node:test';
import { app } from '../server/app.js';

test('health endpoint responds successfully', async (t) => {
  const server = app.listen(0, '127.0.0.1');
  t.after(() => server.close());

  await new Promise((resolve) => server.once('listening', resolve));
  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.service, 'caiwugongju');
});
