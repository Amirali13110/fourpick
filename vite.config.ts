import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const GEMINI_MODEL = 'gemini-3.5-flash-lite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/generate': {
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          rewrite: () => `/v1beta/models/${GEMINI_MODEL}:generateContent`,
          headers: {
            'x-goog-api-key': env.GEMINI_API_KEY?.trim() ?? '',
          },
        },
      },
    },
  }
})
