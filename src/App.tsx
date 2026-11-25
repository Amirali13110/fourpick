import { QuestionCard } from './components/QuestionCard'
import { QuizStart } from './components/QuizStart'
import { useQuiz } from './hooks/useQuiz'

const LOADING_TILES = ['A', 'B', 'C', 'D'] as const

export function App() {
  const {
    level,
    currentQuestion,
    questionNumber,
    totalQuestions,
    selectedOption,
    isLoading,
    error,
    setLevel,
    loadQuestions,
    selectOption,
    nextQuestion,
  } = useQuiz()

  const isIdle = !isLoading && !error && !currentQuestion

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-slate-950 px-5 py-12 text-slate-50 antialiased">
      {/* Ambient Drifting Background Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="animate-orb-float absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="animate-orb-float-slow absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl" />
      </div>

      <header className="relative z-10 flex flex-col items-center gap-2 text-center">
        <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/15 px-3 py-1 text-xs font-bold tracking-widest text-indigo-300 uppercase">
          English Quiz
        </span>
        <h1 className="animate-gradient-x bg-gradient-to-r from-white via-indigo-200 to-fuchsia-300 bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          FourPick
        </h1>
      </header>

      <div className="relative z-10 flex w-full justify-center">
        {isIdle && (
          <QuizStart
            selectedLevel={level}
            onSelectLevel={setLevel}
            onStart={() => void loadQuestions()}
          />
        )}

        {isLoading && (
          <section className="animate-card-enter flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-2xl border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2.5" aria-hidden="true">
              {LOADING_TILES.map((letter, idx) => (
                <span
                  key={letter}
                  style={{ animationDelay: `${idx * 140}ms` }}
                  className="animate-tile-wave flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/40 bg-indigo-500/15 text-sm font-bold text-indigo-200 shadow-lg shadow-indigo-500/15"
                >
                  {letter}
                </span>
              ))}
            </div>
            <p className="text-sm font-medium text-slate-300">
              Crafting your questions...
            </p>
          </section>
        )}

        {!isLoading && error && (
          <section
            role="alert"
            className="animate-shake-wrong flex w-full max-w-xl flex-col items-center gap-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center backdrop-blur-md"
          >
            <p className="text-sm text-rose-200">{error}</p>
            <button
              type="button"
              onClick={() => void loadQuestions()}
              className="cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40 active:scale-[0.98]"
            >
              Try Again
            </button>
          </section>
        )}

        {!isLoading && !error && currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            selectedOption={selectedOption}
            onSelectOption={selectOption}
            onNext={nextQuestion}
          />
        )}
      </div>
    </main>
  )
}

export default App
