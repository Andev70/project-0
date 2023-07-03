import fs from 'node:fs/promises';
import express from 'express';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
import cors from 'cors';
import users from './route/user-route.js';
import posts from './route/post.route.js';
import profiles from './route/p-route.js';
//import todos from './routes/todo-route.js';
dotenv.config();
// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/posts', posts);
app.use('/api/v1/users', users);
app.use('/api/v1/profiles', profiles);
// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/ssr-manifest.json', 'utf-8')
  : undefined;

// Create http server

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
const serverConnect = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

serverConnect();
