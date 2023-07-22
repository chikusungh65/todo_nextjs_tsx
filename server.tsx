import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import cors from 'cors';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const urlString = req.url ?? '/';
    const parsedUrl = parse(urlString, true);
    const { pathname, query } = parsedUrl;

    cors()(req, res, () => {
      handle(req, res, parsedUrl);
    });
  });

  server.on('error', (err: any) => {
    console.error('Server error:', err);
  });

  server.listen(5000, () => {
    console.log('> Ready on http://localhost:5000');
  });
});
