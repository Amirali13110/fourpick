export interface AiGenerateRequest {
  systemPrompt?: string
  userPrompt?: string
}

export interface AiGenerateResponse {
  text: string
}
