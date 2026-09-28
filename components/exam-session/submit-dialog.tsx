import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function SubmitDialog({
  open,
  onOpenChange,
  answered,
  total,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  answered: number
  total: number
  onConfirm: () => void
}) {
  const unanswered = total - answered

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-6 sm:max-w-md">
        <DialogHeader>
          <span className="mb-2 flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Send className="size-5" aria-hidden="true" />
          </span>
          <DialogTitle className="text-lg font-bold">Selesaikan Ujian</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Apakah Anda yakin ingin mengumpulkan ujian?
          </DialogDescription>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border p-3">
            <dt className="text-xs text-muted-foreground">Sudah dijawab</dt>
            <dd className="font-mono text-xl font-bold text-primary tabular-nums">{answered}</dd>
          </div>
          <div className="rounded-lg border p-3">
            <dt className="text-xs text-muted-foreground">Belum dijawab</dt>
            <dd
              className={
                unanswered > 0
                  ? 'font-mono text-xl font-bold text-destructive tabular-nums'
                  : 'font-mono text-xl font-bold tabular-nums'
              }
            >
              {unanswered}
            </dd>
          </div>
        </dl>

        <ul className="flex list-disc flex-col gap-1 rounded-lg bg-muted p-4 pl-9 text-sm leading-relaxed text-muted-foreground">
          <li>Setelah dikumpulkan, jawaban tidak bisa diubah</li>
          <li>Pastikan semua jawaban yang ingin disimpan sudah benar</li>
        </ul>

        <DialogFooter className="gap-2">
          <Button variant="outline" size="lg" className="h-10" onClick={() => onOpenChange(false)}>
            Kembali
          </Button>
          <Button size="lg" className="h-10" onClick={onConfirm}>
            Ya, Submit Ujian
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
