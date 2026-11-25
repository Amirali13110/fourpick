export interface AiPart {
  text?: string
}

export interface AiContent {
  parts: AiPart[]
}

export interface AiCandidate {
  content?: {
    parts?: AiPart[]
  }
}

export interface AiGenerationConfig {
  responseMimeType?: string
}

export interface AiGenerateRequest {
  systemInstruction?: AiContent
  contents: AiContent[]
  generationConfig?: AiGenerationConfig
}

export interface AiGenerateResponse {
  candidates?: AiCandidate[]
}
