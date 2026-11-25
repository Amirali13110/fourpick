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
    <>
      <section className="animate-card-enter flex w-full max-w-2xl flex-col">
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md sm:p-8">
          {/* Progress Header */}
          <div className="mb-5 flex flex-col gap-2.5">
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
            <h2 className="mb-6 text-xl font-semibold leading-relaxed text-slate-50 sm:text-2xl">
              {question.question}
            </h2>

            {/* 4 Bigger Row Option Cards */}
            <div className="flex flex-col gap-3.5">
              {question.options.map((option, index) => (
                <OptionButton
                  key={`${questionNumber}-${option}`}
                  index={index}
                  label={option}
                  disabled={isAnswered}
                  state={getOptionState(
                    index,
                    selectedOption,
                    question.correctIndex,
                  )}
                  onSelect={onSelectOption}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Bottom Explanation & Next Action Bar (only after selecting an option) */}
      {isAnswered && (
        <div className="animate-reveal-up fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-slate-950/90 px-4 py-4 shadow-[0_-12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-6">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div
              role="status"
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm leading-snug ${
                isCorrect
                  ? 'border-emerald-500/35 bg-emerald-500/12 text-emerald-200'
                  : 'border-rose-500/35 bg-rose-500/12 text-rose-200'
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
              className="group relative shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-violet-500/45 active:translate-y-0 active:scale-[0.98]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative whitespace-nowrap">
                {isLastQuestion ? 'Next Batch →' : 'Next Question →'}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
