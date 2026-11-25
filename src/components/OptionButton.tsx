import type { OptionState } from '../types/quiz'

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const

interface OptionButtonProps {
  index: number
  label: string
  state: OptionState
  disabled: boolean
  onSelect: (index: number) => void
}

const STATE_STYLES: Record<OptionState, string> = {
  idle: 'border-white/10 bg-slate-800/70 text-slate-100 hover:border-indigo-400/70 hover:bg-indigo-500/12 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/15 active:scale-[0.98]',
  correct:
    'animate-pop-correct border-emerald-400/80 bg-emerald-500/15 text-emerald-100',
  wrong: 'animate-shake-wrong border-rose-400/80 bg-rose-500/15 text-rose-100',
  dimmed:
    'border-white/5 bg-slate-800/35 text-slate-500 opacity-55 scale-[0.98]',
}

const BADGE_STYLES: Record<OptionState, string> = {
  idle: 'bg-slate-700/80 text-slate-300 group-hover:scale-105 group-hover:bg-indigo-500 group-hover:text-white',
  correct: 'bg-emerald-400 text-slate-950 scale-105',
  wrong: 'bg-rose-500 text-white',
  dimmed: 'bg-slate-800 text-slate-500',
}

export function OptionButton({
  index,
  label,
  state,
  disabled,
  onSelect,
}: OptionButtonProps) {
  const letter = OPTION_LETTERS[index] ?? String(index + 1)
  const enterDelay = `${index * 65}ms`

  return (
    <div style={{ animationDelay: enterDelay }} className="animate-option-enter">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelect(index)}
        className={`group flex aspect-square w-full flex-col justify-between rounded-2xl border p-4 text-center transition-all duration-200 sm:p-5 ${
          disabled ? 'cursor-default' : 'cursor-pointer'
        } ${STATE_STYLES[state]}`}
      >
        <div className="flex w-full items-center justify-between">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200 ${BADGE_STYLES[state]}`}
          >
            {letter}
          </span>

          {state === 'correct' && (
            <span
              aria-label="Correct answer"
              className="animate-badge-pop flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-sm font-bold text-emerald-300"
            >
              ✓
            </span>
          )}

          {state === 'wrong' && (
            <span
              aria-label="Wrong answer"
              className="animate-badge-pop flex h-6 w-6 items-center justify-center rounded-full bg-rose-400/20 text-sm font-bold text-rose-300"
            >
              ✕
            </span>
          )}
        </div>

        <span className="flex flex-1 items-center justify-center px-1 text-sm font-semibold leading-snug sm:text-base">
          {label}
        </span>

        <div className="h-2" aria-hidden="true" />
      </button>
    </div>
  )
}
