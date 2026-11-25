import axios from 'axios'
import { useCallback, useState } from 'react'
import { fetchQuizQuestions } from '../api/quiz'
import type { EnglishLevel, QuizQuestion } from '../types/quiz'

interface UseQuizReturn {
  level: EnglishLevel
  currentQuestion: QuizQuestion | null
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  isLoading: boolean
  error: string | null
  setLevel: (level: EnglishLevel) => void
  loadQuestions: () => Promise<void>
  selectOption: (index: number) => void
  nextQuestion: () => void
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const apiMessage = (
      err.response?.data as { error?: { message?: string } } | undefined
    )?.error?.message
    return apiMessage ?? err.message
  }

  if (err instanceof Error) {
    return err.message
  }

  return 'Failed to load quiz questions.'
}

export function useQuiz(): UseQuizReturn {
  const [level, setLevel] = useState<EnglishLevel>('A2')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadQuestions = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const batch = await fetchQuizQuestions(level)
      setQuestions(batch)
      setCurrentIndex(0)
      setSelectedOption(null)
    } catch (err: unknown) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }, [level])

  const selectOption = (index: number): void => {
    if (selectedOption !== null) return
    setSelectedOption(index)
  }

  const nextQuestion = (): void => {
    const isLastQuestion = currentIndex >= questions.length - 1

    if (isLastQuestion) {
      void loadQuestions()
      return
    }

    setCurrentIndex((prev) => prev + 1)
    setSelectedOption(null)
  }

  return {
    level,
    currentQuestion: questions[currentIndex] ?? null,
    questionNumber: currentIndex + 1,
    totalQuestions: questions.length,
    selectedOption,
    isLoading,
    error,
    setLevel,
    loadQuestions,
    selectOption,
    nextQuestion,
  }
}
