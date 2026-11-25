import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import generateHandler from './netlify/functions/generate.mts'

function localApiPlugin(groqApiKey: string): Plugin {
  return {
    name: 'local-api-generate',
    configureServer(server) {
      server.middlewares.use('/api/generate', async (req, res) => {
        if (groqApiKey && !process.env.GROQ_API_KEY) {
          process.env.GROQ_API_KEY = groqApiKey
        }

        const chunks: Buffer[] = []
        for await (const chunk of req) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
        }

        const method = req.method ?? 'GET'
        const body =
          method === 'GET' || method === 'HEAD'
            ? undefined
            : Buffer.concat(chunks)

        const webReq = new Request('http://localhost/api/generate', {
          method,
          headers: {
            'Content-Type': req.headers['content-type'] ?? 'application/json',
          },
          body,
        })

        const webRes = await generateHandler(webReq)
        res.statusCode = webRes.status
        res.setHeader(
          'Content-Type',
          webRes.headers.get('content-type') ?? 'application/json',
        )
        res.end(await webRes.text())
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      localApiPlugin(env.GROQ_API_KEY?.trim() ?? ''),
    ],
  }
})
