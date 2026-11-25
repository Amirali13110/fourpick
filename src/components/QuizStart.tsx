import { ENGLISH_LEVELS } from '../config/ai'
import type { EnglishLevel } from '../types/quiz'

const TILE_LETTERS = ['A', 'B', 'C', 'D'] as const

const TILE_COLORS = [
  'border-indigo-400/40 bg-indigo-500/15 text-indigo-300',
  'border-violet-400/40 bg-violet-500/15 text-violet-300',
  'border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-300',
  'border-emerald-400/40 bg-emerald-500/15 text-emerald-300',
] as const

interface QuizStartProps {
  selectedLevel: EnglishLevel
  onSelectLevel: (level: EnglishLevel) => void
  onStart: () => void
}

export function QuizStart({
  selectedLevel,
  onSelectLevel,
  onStart,
}: QuizStartProps) {
  return (
    <section className="animate-card-enter flex w-full max-w-xl flex-col items-center gap-7 rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-md sm:p-10">
      {/* Floating 4-Tile Emblem */}
      <div className="flex items-center gap-2.5" aria-hidden="true">
        {TILE_LETTERS.map((letter, idx) => (
          <span
            key={letter}
            style={{ animationDelay: `${idx * 180}ms` }}
            className={`animate-tile-bob flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-extrabold shadow-lg ${TILE_COLORS[idx]}`}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
          Ready to put your English to the test?
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
          Choose your level, pick from four options, and get quick explanations
          on the spot!
        </p>
      </div>

      {/* Level Selector */}
      <div className="flex w-full flex-col gap-2.5">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Select Your English Level
        </span>
        <div
          role="radiogroup"
          aria-label="English level"
          className="grid grid-cols-3 gap-2.5"
        >
          {ENGLISH_LEVELS.map((item) => {
            const isSelected = item.code === selectedLevel

            return (
              <button
                key={item.code}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectLevel(item.code)}
                className={`flex cursor-pointer flex-col items-center gap-0.5 rounded-xl border px-3 py-2.5 transition-all duration-200 ${
                  isSelected
                    ? 'scale-[1.03] border-indigo-400/80 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/20'
                    : 'border-white/10 bg-slate-800/60 text-slate-300 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-slate-800'
                }`}
              >
                <span className="text-base font-extrabold tracking-tight">
                  {item.code}
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    isSelected ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="group relative inline-flex cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-[length:200%_200%] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/45 active:translate-y-0 active:scale-[0.98]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
        <span className="relative">Start Playing</span>
        <span
          aria-hidden="true"
          className="relative transition-transform duration-200 group-hover:translate-x-1.5"
        >
          →
        </span>
      </button>
    </section>
  )
}
