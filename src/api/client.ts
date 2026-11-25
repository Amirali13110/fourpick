import axios from 'axios'
import { AI_CONFIG } from '../config/ai'

export const aiClient = axios.create({
  baseURL: AI_CONFIG.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

aiClient.interceptors.request.use((config) => {
  if (!AI_CONFIG.apiKey) {
    throw new Error('Missing GEMINI_API_KEY in .env')
  }

  config.headers.set('x-goog-api-key', AI_CONFIG.apiKey)
  return config
})
