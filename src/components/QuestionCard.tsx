import type { OptionState, QuizQuestion } from '../types/quiz'
import { OptionButton } from './OptionButton'

interface QuestionCardProps {
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  selectedOption: number | null
  onSelectOption: (index: number) => void
  onNext: () => void
}

function getOptionState(
  index: number,
  selectedOption: number | null,
  correctIndex: number,
): OptionState {
  if (selectedOption === null) return 'idle'
  if (index === correctIndex) return 'correct'
  if (index === selectedOption) return 'wrong'
  return 'dimmed'
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
}: QuestionCardProps) {
  const isAnswered = selectedOption !== null
  const isCorrect = selectedOption === question.correctIndex
  const isLastQuestion = questionNumber === totalQuestions
  const progressPercent = (questionNumber / totalQuestions) * 100

  return (
    <section className="animate-card-enter flex w-full max-w-xl flex-col gap-5">
      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md sm:p-7">
        {/* Progress Header */}
        <div className="mb-5 flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-wide text-slate-400">
            Question{' '}
            <span className="text-slate-100">{questionNumber}</span> of{' '}
            {totalQuestions}
          </span>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-slate-800/90"
            role="progressbar"
            aria-valuenow={questionNumber}
            aria-valuemin={1}
            aria-valuemax={totalQuestions}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-fuchsia-400 shadow-[0_0_12px_rgba(139,92,246,0.65)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Per-question animated transition */}
        <div key={questionNumber} className="animate-question-enter">
          {/* Question */}
          <h2 className="mb-6 text-lg font-semibold leading-relaxed text-slate-50 sm:text-xl">
            {question.question}
          </h2>

          {/* 4 Square Option Cards */}
          <div className="grid grid-cols-2 gap-3.5">
            {question.options.map((option, index) => (
              <OptionButton
                key={`${questionNumber}-${option}`}
                index={index}
                label={option}
                disabled={isAnswered}
                state={getOptionState(index, selectedOption, question.correctIndex)}
                onSelect={onSelectOption}
              />
            ))}
          </div>
        </div>

        {/* Explanation & Next Action */}
        {isAnswered && (
          <div className="animate-reveal-up mt-6 flex flex-col gap-4 border-t border-white/10 pt-5">
            <div
              role="status"
              className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                isCorrect
                  ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-200'
                  : 'border-rose-500/35 bg-rose-500/10 text-rose-200'
              }`}
            >
              <span className="font-bold">
                {isCorrect ? 'Correct! ' : 'Not quite. '}
              </span>
              <span className="text-slate-200">{question.explanation}</span>
            </div>

            <button
              type="button"
              onClick={onNext}
              className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:-translate-y-0.5 hover:shadow-violet-500/40 active:translate-y-0 active:scale-[0.99]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">
                {isLastQuestion ? 'Next Batch →' : 'Next Question →'}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
