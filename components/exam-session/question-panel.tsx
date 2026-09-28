import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDot,
  Save,
  Send,
  SkipForward,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ExamQuestion } from '@/lib/exam-engine'
import type { Category } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

const categoryName: Record<Category, string> = {
  TWK: 'Tes Wawasan Kebangsaan',
  TIU: 'Tes Intelegensi Umum',
  TKP: 'Tes Karakteristik Pribadi',
}

export function QuestionPanel({
  question,
  index,
  total,
  selected,
  isSaved,
  isDirty,
  justSaved,
  isLast,
  disabled,
  onSelect,
  onPrev,
  onSkip,
  onSave,
  onSaveNext,
  onSubmit,
}: {
  question: ExamQuestion
  index: number
  total: number
  selected: string | null
  isSaved: boolean
  isDirty: boolean
  justSaved: boolean
  isLast: boolean
  disabled: boolean
  onSelect: (optionId: string) => void
  onPrev: () => void
  onSkip: () => void
  onSave: () => void
  onSaveNext: () => void
  onSubmit: () => void
}) {
  return (
    <section
      aria-labelledby="question-heading"
      className="order-1 flex flex-col rounded-xl border bg-card lg:order-2"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <h2 id="question-heading" className="text-base font-bold">
            Soal {index + 1} <span className="font-normal text-muted-foreground">dari {total}</span>
          </h2>
          <Badge className="bg-secondary font-mono text-secondary-foreground">
            {question.category}
          </Badge>
          <span className="hidden text-xs text-muted-foreground md:inline">
            {categoryName[question.category]}
          </span>
        </div>
        <SaveState isSaved={isSaved} isDirty={isDirty} justSaved={justSaved} />
      </div>

      <div className="flex flex-1 flex-col gap-6 px-5 py-6 md:px-8 md:py-8">
        <p className="text-base leading-relaxed text-pretty md:text-lg">{question.text}</p>

        <div role="radiogroup" aria-label="Pilihan jawaban" className="flex flex-col gap-3">
          {question.options.map((option, i) => {
            const checked = selected === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onSelect(option.id)}
                className={cn(
                  'flex w-full items-start gap-4 rounded-lg border p-4 text-left text-sm leading-relaxed transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 md:text-base',
                  checked
                    ? 'border-primary bg-secondary text-foreground'
                    : 'border-border hover:border-primary/40 hover:bg-muted',
                )}
              >
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-md border text-sm font-bold',
                    checked
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input bg-card text-muted-foreground',
                  )}
                >
                  {LETTERS[i]}
                </span>
                <span className="pt-1">{option.text}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t bg-muted/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="h-10" onClick={onPrev} disabled={index === 0}>
            <ChevronLeft />
            Sebelumnya
          </Button>
          {!isLast && (
            <Button variant="ghost" size="lg" className="h-10" onClick={onSkip}>
              Lewati
              <SkipForward />
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="h-10 border-primary text-primary hover:bg-secondary hover:text-primary"
            onClick={onSave}
            disabled={disabled || selected === null}
          >
            <Save />
            Simpan Jawaban
          </Button>
          {isLast ? (
            <Button size="lg" className="h-10" onClick={onSubmit} disabled={disabled}>
              <Send />
              Submit Ujian
            </Button>
          ) : (
            <Button
              size="lg"
              className="h-10"
              onClick={onSaveNext}
              disabled={disabled || selected === null}
            >
              Simpan & Lanjutkan
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

function SaveState({
  isSaved,
  isDirty,
  justSaved,
}: {
  isSaved: boolean
  isDirty: boolean
  justSaved: boolean
}) {
  if (isDirty) {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-destructive" role="status">
        <CircleDot className="size-4" aria-hidden="true" />
        Belum disimpan
      </span>
    )
  }
  if (isSaved) {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-brand-bright" role="status">
        <CircleCheck className="size-4" aria-hidden="true" />
        {justSaved ? 'Jawaban berhasil disimpan' : 'Jawaban tersimpan'}
      </span>
    )
  }
  return <span className="text-xs text-muted-foreground">Belum dijawab</span>
}
