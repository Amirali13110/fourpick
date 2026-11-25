import type { EnglishLevel, EnglishLevelOption } from '../types/quiz'

export const AI_CONFIG = {
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  model: 'gemini-3.5-flash-lite',
  apiKey: import.meta.env.GEMINI_API_KEY?.trim() ?? '',
} as const

export const ENGLISH_LEVELS: readonly EnglishLevelOption[] = [
  { code: 'A1', label: 'Beginner' },
  { code: 'A2', label: 'Elementary' },
  { code: 'B1', label: 'Intermediate' },
  { code: 'B2', label: 'Upper-Int' },
  { code: 'C1', label: 'Advanced' },
  { code: 'C2', label: 'Mastery' },
]

/**
 * Builds the system prompt for FourPick English 4-option batch quiz generation
 * tailored to the chosen CEFR level.
 */
export function buildSystemPrompt(level: EnglishLevel): string {
  const levelInfo = ENGLISH_LEVELS.find((item) => item.code === level)
  const levelName = levelInfo ? `${levelInfo.code} (${levelInfo.label})` : level

  return `You are FourPick, an expert English language quiz designer.

Task:
Generate a batch of 10 unique, well-varied multiple-choice English language questions tailored specifically for CEFR ${levelName} learners (covering appropriate vocabulary, grammar, tenses, prepositions, common phrases, idioms, and practical usage for this level).

Output format:
Return ONLY a valid JSON array. Do not wrap the response in markdown code fences and do not include any text before or after the JSON.

Each item in the array must match this exact shape:
{
  "question": "Clear, concise English question.",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctIndex": 0,
  "explanation": "One concise sentence explaining why the answer is correct."
}

Strict rules:
- Every question must have exactly 4 distinct, plausible options.
- Do NOT include option labels (like "A.", "B)", "1.") inside the option strings.
- Do NOT use "All of the above" or "None of the above".
- Exactly ONE option must be unambiguously correct.
- "correctIndex" must be an integer from 0 to 3 pointing to the exact correct option in "options".
- Distribute "correctIndex" evenly across the batch so the correct answer is not always in the same position.
- Match the difficulty of questions, options, and explanations strictly to CEFR ${levelName}.
- Keep questions varied and never repeat the same concept or wording within a batch.
- Keep "explanation" to one short, clear, helpful sentence.`
}
