import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const rootDir = path.resolve(currentDir, '..');
const port = Number(process.env.PORT || 4008);

export const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'caiwugongju',
    time: new Date().toISOString()
  });
});

app.use(express.static(path.join(rootDir, 'public'), {
  etag: true,
  lastModified: true,
  setHeaders(res, filePath) {
    res.setHeader('Cache-Control', filePath.endsWith('.html') ? 'no-store' : 'public, max-age=3600');
  }
}));

app.get(/^(?!\/api).*/, (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

if (process.argv[1] === currentFile) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`caiwugongju running on port ${port}`);
  });
}
