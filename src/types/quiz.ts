export type QuizOptions = [string, string, string, string]

export interface QuizQuestion {
  question: string
  options: QuizOptions
  correctIndex: number
  explanation: string
}

export type OptionState = 'idle' | 'correct' | 'wrong' | 'dimmed'

export type EnglishLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface EnglishLevelOption {
  code: EnglishLevel
  label: string
}
