import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api/fast2sms': {
          target: 'https://www.fast2sms.com/dev/bulkV2',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/fast2sms/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const apiKey = env.VITE_FAST2SMS_API_KEY || process.env.VITE_FAST2SMS_API_KEY || '';
              if (apiKey) {
                proxyReq.setHeader('authorization', apiKey);
              }
            });
          }
        }
      }
    }
  };
});
