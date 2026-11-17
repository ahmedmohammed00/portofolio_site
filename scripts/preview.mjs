import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
const root = path.resolve('out');
const port = Number(process.env.PORT || process.argv[2] || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let file = path.resolve(root, '.' + pathname);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        const stat = await fs.stat(file);
        if (stat.isDirectory()) file = path.join(file, 'index.html');
      } catch {
        if (!path.extname(file)) file = path.join(file, 'index.html');
      }
      let body;
      try {
        body = await fs.readFile(file);
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          await fs.readFile(path.join(root, '404.html')).catch(() => Buffer.from('Not found')),
        );
        return;
      }
      res.writeHead(200, {
        'Content-Type': mime[path.extname(file)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store',
      });
      res.end(body);
    } catch {
      res.writeHead(400);
      res.end('Bad request');
    }
  })
  .listen(port, '127.0.0.1', () =>
    process.stdout.write(`Portfolio preview: http://127.0.0.1:${port}\n`),
  );
