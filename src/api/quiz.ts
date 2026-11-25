import { buildSystemPrompt } from '../config/ai'
import type { EnglishLevel, QuizQuestion } from '../types/quiz'
import { generateJson } from './ai'

function isValidQuestion(item: unknown): item is QuizQuestion {
  if (typeof item !== 'object' || item === null) return false

  const candidate = item as Record<string, unknown>

  const hasValidOptions =
    Array.isArray(candidate.options) &&
    candidate.options.length === 4 &&
    candidate.options.every(
      (opt) => typeof opt === 'string' && opt.trim().length > 0,
    )

  const hasValidCorrectIndex =
    typeof candidate.correctIndex === 'number' &&
    Number.isInteger(candidate.correctIndex) &&
    candidate.correctIndex >= 0 &&
    candidate.correctIndex <= 3

  return (
    typeof candidate.question === 'string' &&
    candidate.question.trim().length > 0 &&
    hasValidOptions &&
    hasValidCorrectIndex &&
    typeof candidate.explanation === 'string' &&
    candidate.explanation.trim().length > 0
  )
}

export async function fetchQuizQuestions(
  level: EnglishLevel,
): Promise<QuizQuestion[]> {
  const data = await generateJson<unknown>(buildSystemPrompt(level))

  const rawQuestions = Array.isArray(data)
    ? data
    : typeof data === 'object' &&
        data !== null &&
        Array.isArray((data as { questions?: unknown }).questions)
      ? (data as { questions: unknown[] }).questions
      : null

  if (!rawQuestions) {
    throw new Error('AI returned an invalid quiz format.')
  }

  const questions = rawQuestions.filter(isValidQuestion)

  if (questions.length === 0) {
    throw new Error('No valid quiz questions were returned by the AI.')
  }

  return questions
}
