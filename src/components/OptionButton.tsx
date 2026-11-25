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
  idle: 'border-white/10 bg-slate-800/75 text-slate-100 hover:border-indigo-400/70 hover:bg-indigo-500/12 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/15 active:scale-[0.99]',
  correct:
    'animate-pop-correct border-emerald-400/80 bg-emerald-500/15 text-emerald-100',
  wrong: 'animate-shake-wrong border-rose-400/80 bg-rose-500/15 text-rose-100',
  dimmed:
    'border-white/5 bg-slate-800/35 text-slate-500 opacity-55 scale-[0.99]',
}

const BADGE_STYLES: Record<OptionState, string> = {
  idle: 'bg-slate-700/80 text-slate-200 group-hover:scale-105 group-hover:bg-indigo-500 group-hover:text-white',
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
        className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-200 sm:px-5 sm:py-4.5 ${
          disabled ? 'cursor-default' : 'cursor-pointer'
        } ${STATE_STYLES[state]}`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold transition-all duration-200 ${BADGE_STYLES[state]}`}
        >
          {letter}
        </span>

        <span className="flex-1 text-base font-medium leading-snug sm:text-[17px]">
          {label}
        </span>

        {state === 'correct' && (
          <span
            aria-label="Correct answer"
            className="animate-badge-pop flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-sm font-bold text-emerald-300"
          >
            ✓
          </span>
        )}

        {state === 'wrong' && (
          <span
            aria-label="Wrong answer"
            className="animate-badge-pop flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-400/20 text-sm font-bold text-rose-300"
          >
            ✕
          </span>
        )}
      </button>
    </div>
  )
}
