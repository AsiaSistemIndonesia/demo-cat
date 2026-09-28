import { Check, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ExamQuestion } from '@/lib/exam-engine'
import { cn } from '@/lib/utils'

export function QuestionNav({
  questions,
  currentIndex,
  answeredKeys,
  onSelect,
  onSubmit,
  disabled,
}: {
  questions: ExamQuestion[]
  currentIndex: number
  answeredKeys: Set<string>
  onSelect: (index: number) => void
  onSubmit: () => void
  disabled: boolean
}) {
  return (
    <aside className="order-2 flex h-fit flex-col gap-5 rounded-xl border bg-card p-5 lg:sticky lg:top-24 lg:order-1">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold">Navigasi Soal</h2>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {answeredKeys.size}/{questions.length}
        </span>
      </div>

      <ol className="grid grid-cols-8 gap-1.5 sm:grid-cols-10 lg:grid-cols-6">
        {questions.map((q, i) => {
          const isCurrent = i === currentIndex
          const isAnswered = answeredKeys.has(q.key)
          return (
            <li key={q.key}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Soal ${i + 1}${isAnswered ? ', sudah dijawab' : ', belum dijawab'}`}
                className={cn(
                  'relative flex aspect-square w-full items-center justify-center rounded-md border text-sm font-semibold tabular-nums transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                  isCurrent &&
                    'border-brand-bright bg-brand-bright text-primary-foreground ring-2 ring-brand-bright/30 ring-offset-1',
                  !isCurrent && isAnswered && 'border-primary bg-primary text-primary-foreground',
                  !isCurrent &&
                    !isAnswered &&
                    'border-primary/40 bg-card text-primary hover:bg-secondary',
                )}
              >
                {i + 1}
                {isAnswered && (
                  <span className="absolute -top-1 -right-1 flex size-3.5 items-center justify-center rounded-full bg-card text-primary ring-1 ring-primary">
                    <Check className="size-2.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>

      <ul className="flex flex-col gap-2 border-t pt-4 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="size-4 rounded border border-brand-bright bg-brand-bright" />
          Soal aktif saat ini
        </li>
        <li className="flex items-center gap-2">
          <span className="relative size-4 rounded border border-primary bg-primary">
            <span className="absolute -top-1 -right-1 flex size-2.5 items-center justify-center rounded-full bg-card ring-1 ring-primary">
              <Check className="size-2 text-primary" strokeWidth={3} />
            </span>
          </span>
          Sudah dijawab & disimpan
        </li>
        <li className="flex items-center gap-2">
          <span className="size-4 rounded border border-primary/40 bg-card" />
          Belum dijawab
        </li>
      </ul>

      <Button
        variant="outline"
        size="lg"
        className="h-10 border-primary text-primary hover:bg-secondary hover:text-primary"
        onClick={onSubmit}
        disabled={disabled}
      >
        <Send />
        Submit Ujian
      </Button>
    </aside>
  )
}
