import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

/*
 * Vite's dev server does not run Vercel serverless functions, so
 * /api/* would 404 during `npm run dev`. This plugin mounts the same
 * handler from api/ as dev middleware, with a tiny shim that gives
 * the Node request/response the pieces Vercel normally provides
 * (parsed body, res.status().json()).
 *
 * Dev only — in production Vercel runs api/comment.js natively.
 */
function apiRoutes(env: Record<string, string>): Plugin {
  return {
    name: 'local-api-routes',
    apply: 'serve',

    configureServer(server) {
      // The handler reads credentials from process.env
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '').split('?')[0];

        if (!url.startsWith('/api/')) return next();

        const route = url.replace('/api/', '').replace(/\/$/, '');

        try {
          const module = await server.ssrLoadModule(`/api/${route}.js`);

          // Collect the request body
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const raw = Buffer.concat(chunks).toString('utf8');

          const request = Object.assign(req, {
            body: raw ? JSON.parse(raw) : {},
            query: {},
          });

          const response = Object.assign(res, {
            status(code: number) {
              res.statusCode = code;
              return response;
            },
            json(payload: unknown) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(payload));
              return response;
            },
          });

          await module.default(request, response);
        } catch (error) {
          console.error(`[local-api] /api/${route} failed:`, error);

          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Local API route failed.' }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), apiRoutes(env)],
  };
});
