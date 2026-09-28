'use client'

import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  Target,
} from 'lucide-react'
import { useExamStore } from '@/components/exam-provider'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { Button, buttonVariants } from '@/components/ui/button'
import type { Exam } from '@/lib/mock-data'
import { cn, formatDateRange } from '@/lib/utils'

export function ExamList({ exams }: { exams: Exam[] }) {
  const { results } = useExamStore()

  return (
    <ul className="flex flex-col gap-4">
      {exams.map((exam) => (
        <li key={exam.slug}>
          <ExamCard
            exam={exam}
            status={results[exam.slug] ? 'selesai' : exam.status}
          />
        </li>
      ))}
    </ul>
  )
}

function ExamCard({ exam, status }: { exam: Exam; status: Exam['status'] }) {
  const meta = [
    { icon: GraduationCap, label: 'Jenjang', value: exam.level },
    { icon: FileText, label: 'Total Soal', value: `${exam.totalQuestions} soal` },
    { icon: Clock, label: 'Durasi', value: `${exam.durationMinutes} menit` },
    { icon: Target, label: 'Passing Grade', value: String(exam.passingGrade) },
  ]

  return (
    <article
      className={cn(
        'flex flex-col gap-5 rounded-xl border bg-card p-5 transition-shadow md:p-6',
        status === 'tersedia' && 'border-primary/30 shadow-md shadow-primary/5',
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <StatusBadge status={status} />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <CalendarDays aria-hidden="true" className="size-3.5" />
            {formatDateRange(exam.date, exam.endDate)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Seleksi Jabatan Fungsional
        </span>
        <h2 className="text-lg font-bold text-balance text-foreground md:text-xl">
          {exam.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {exam.description}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4 md:grid-cols-4">
        {meta.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2">
            <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-bright" />
            <div className="flex flex-col gap-0.5">
              <dt className="text-xs text-muted-foreground">{label}</dt>
              <dd className="text-sm font-semibold">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="flex justify-end">
        {status === 'tersedia' && (
          <Link
            href={`/ujian/${exam.slug}/info`}
            className={cn(buttonVariants({ size: 'lg' }), 'h-10 px-5')}
          >
            Mulai Ujian
            <ArrowRight />
          </Link>
        )}
        {status === 'selesai' && (
          <Link
            href={`/ujian/${exam.slug}/result`}
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-10 px-5')}
          >
            Lihat Hasil
          </Link>
        )}
        {status === 'belum-dimulai' && (
          <Button size="lg" className="h-10 px-5" disabled>
            Mulai Ujian
          </Button>
        )}
      </div>
    </article>
  )
}
