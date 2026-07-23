import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function waitFor(url, child, logs) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (child.exitCode !== null) {
      throw new Error(`Server exited before it became ready.\n${logs.join('')}`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {
      // The server may still be initializing its temporary database.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for ${url}.\n${logs.join('')}`);
}

test('finance tool serves health and copied pages', async (t) => {
  const dataDir = mkdtempSync(path.join(tmpdir(), 'caiwugongju-health-'));
  const port = 44000 + Math.floor(Math.random() * 1000);
  const logs = [];
  const child = spawn(process.execPath, ['server/app.js'], {
    cwd: rootDir,
    env: {
      ...process.env,
      DATA_DIR: dataDir,
      PORT: String(port),
      ADMIN_INITIAL_PASSWORD: ''
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  child.stdout.on('data', (chunk) => logs.push(chunk.toString()));
  child.stderr.on('data', (chunk) => logs.push(chunk.toString()));

  t.after(() => {
    child.kill();
    rmSync(dataDir, { recursive: true, force: true });
  });

  const healthResponse = await waitFor(`http://127.0.0.1:${port}/api/health`, child, logs);
  const health = await healthResponse.json();
  assert.equal(health.ok, true);
  assert.equal(health.service, 'caiwugongju');

  const pageResponse = await fetch(`http://127.0.0.1:${port}/caiwugongju/`);
  assert.equal(pageResponse.status, 200);
  assert.match(await pageResponse.text(), /<div id="root"><\/div>/);
});
