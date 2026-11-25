const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta'
const GEMINI_MODEL = 'gemini-3.5-flash-lite'

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json(
      { error: { message: 'Method not allowed' } },
      { status: 405 },
    )
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim()

  if (!apiKey) {
    return Response.json(
      {
        error: {
          message: 'Missing GEMINI_API_KEY in Netlify environment variables.',
        },
      },
      { status: 500 },
    )
  }

  try {
    const body = await req.text()

    const upstream = await fetch(
      `${GEMINI_BASE_URL}/models/${GEMINI_MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body,
      },
    )

    const data = await upstream.text()

    return new Response(data, {
      status: upstream.status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch {
    return Response.json(
      { error: { message: 'Failed to reach Gemini API from server.' } },
      { status: 502 },
    )
  }
}

export const config = {
  path: '/api/generate',
}
