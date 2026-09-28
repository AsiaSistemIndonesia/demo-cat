import { Timer } from 'lucide-react'
import { BrandMark } from '@/components/brand-logo'
import { Progress } from '@/components/ui/progress'
import { formatCountdown } from '@/lib/exam-engine'
import { cn } from '@/lib/utils'

export function SessionHeader({
  title,
  participantName,
  remainingSeconds,
  answered,
  total,
}: {
  title: string
  participantName: string
  remainingSeconds: number
  answered: number
  total: number
}) {
  const critical = remainingSeconds <= 5 * 60

  return (
    <header className="sticky top-0 z-30 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <BrandMark className="bg-primary-foreground text-primary" />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-base font-bold">{title}</span>
            <span className="truncate text-xs text-primary-foreground/70">{participantName}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden w-48 flex-col gap-1.5 sm:flex">
            <div className="flex items-center justify-between text-xs text-primary-foreground/80">
              <span>Terjawab</span>
              <span className="font-mono font-semibold text-primary-foreground tabular-nums">
                {answered} / {total}
              </span>
            </div>
            <Progress
              value={(answered / total) * 100}
              aria-label="Progres jawaban"
              className="[&_[data-slot=progress-indicator]]:bg-primary-foreground [&_[data-slot=progress-track]]:bg-primary-foreground/20"
            />
          </div>

          <div
            role="timer"
            aria-live="off"
            aria-label="Sisa waktu ujian"
            className={cn(
              'flex items-center gap-3 rounded-lg px-4 py-2',
              critical
                ? 'bg-destructive text-primary-foreground'
                : 'bg-primary-foreground text-primary',
            )}
          >
            <Timer className="size-5" aria-hidden="true" />
            <div className="flex flex-col leading-none">
              <span className="text-[0.65rem] font-semibold tracking-wider uppercase opacity-70">
                Sisa Waktu
              </span>
              <span className="font-mono text-2xl font-bold tabular-nums">
                {formatCountdown(remainingSeconds)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
