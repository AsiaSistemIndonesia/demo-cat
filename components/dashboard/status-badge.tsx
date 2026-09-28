import { Badge } from '@/components/ui/badge'
import type { ExamStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const config: Record<ExamStatus, { label: string; className: string }> = {
  tersedia: { label: 'Tersedia', className: 'bg-primary text-primary-foreground' },
  'belum-dimulai': {
    label: 'Belum Dimulai',
    className: 'border-border bg-card text-muted-foreground',
  },
  selesai: { label: 'Selesai', className: 'bg-secondary text-secondary-foreground' },
}

export function StatusBadge({ status }: { status: ExamStatus }) {
  const { label, className } = config[status]
  return (
    <Badge variant="outline" className={cn('border-transparent', className)}>
      {status === 'tersedia' && (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-primary-foreground" />
      )}
      {label}
    </Badge>
  )
}
