import { AI_CONFIG } from '../config/ai'
import type { AiGenerateRequest, AiGenerateResponse } from '../types/ai'
import { aiClient } from './client'

export async function generateJson<T>(systemPrompt: string): Promise<T> {
  const trimmedSystemPrompt = systemPrompt.trim()

  const payload: AiGenerateRequest = {
    ...(trimmedSystemPrompt && { systemPrompt: trimmedSystemPrompt }),
    userPrompt: 'Generate.',
  }

  const { data } = await aiClient.post<AiGenerateResponse>(
    AI_CONFIG.endpoint,
    payload,
  )

  const raw = data.text

  if (!raw) {
    throw new Error('AI returned an empty response')
  }

  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')

  return JSON.parse(cleaned) as T
}
