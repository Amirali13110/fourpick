import OpenAI from 'openai'

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'
const GROQ_MODEL = 'openai/gpt-oss-120b'

interface GenerateRequestBody {
  systemPrompt?: string
  userPrompt?: string
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json(
      { error: { message: 'Method not allowed' } },
      { status: 405 },
    )
  }

  const apiKey = process.env.GROQ_API_KEY?.trim()

  if (!apiKey) {
    return Response.json(
      {
        error: {
          message: 'Missing GROQ_API_KEY in environment variables.',
        },
      },
      { status: 500 },
    )
  }

  let payload: GenerateRequestBody
  try {
    payload = (await req.json()) as GenerateRequestBody
  } catch {
    return Response.json(
      { error: { message: 'Invalid JSON request body.' } },
      { status: 400 },
    )
  }

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []

  const systemPrompt = payload.systemPrompt?.trim()
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }

  messages.push({
    role: 'user',
    content: payload.userPrompt?.trim() || 'Generate.',
  })

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: GROQ_BASE_URL,
    })

    const completion = await client.chat.completions.create({
      model: GROQ_MODEL,
      messages,
      response_format: { type: 'json_object' },
    })

    const text = completion.choices[0]?.message?.content

    if (!text) {
      return Response.json(
        { error: { message: 'Groq returned an empty response.' } },
        { status: 502 },
      )
    }

    return Response.json({ text })
  } catch (err: unknown) {
    if (err instanceof OpenAI.APIError) {
      return Response.json(
        { error: { message: err.message } },
        { status: err.status ?? 502 },
      )
    }

    return Response.json(
      { error: { message: 'Failed to reach Groq API from server.' } },
      { status: 502 },
    )
  }
}

export const config = {
  path: '/api/generate',
}
