import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();
        const parsedUrl = new URL(req.url, 'http://localhost:3000');
        
        if (parsedUrl.pathname === '/api/carparks') {
          try {
            const { default: handler } = await import('./api/carparks.js');
            const mockReq = {
              method: req.method,
              query: Object.fromEntries(parsedUrl.searchParams.entries()),
              headers: req.headers
            };
            const mockRes = {
              statusCode: 200,
              setHeader(k: string, v: string) { res.setHeader(k, v); },
              status(code: number) { this.statusCode = code; res.statusCode = code; return this; },
              json(data: any) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              end(data?: any) { res.end(data); }
            };
            return handler(mockReq, mockRes);
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
            return;
          }
        }

        if (parsedUrl.pathname === '/api/health') {
          try {
            const { default: handler } = await import('./api/health.js');
            const mockReq = { method: req.method, headers: req.headers };
            const mockRes = {
              statusCode: 200,
              setHeader(k: string, v: string) { res.setHeader(k, v); },
              status(code: number) { this.statusCode = code; res.statusCode = code; return this; },
              json(data: any) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              end(data?: any) { res.end(data); }
            };
            return handler(mockReq, mockRes);
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
            return;
          }
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

