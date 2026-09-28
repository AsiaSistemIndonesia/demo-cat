'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  Play,
  Target,
  Check,
  X,
} from 'lucide-react'
import { useExamStore } from '@/components/exam-provider'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { Exam } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const rules: { text: string; allowed: boolean }[] = [
  { text: 'Pastikan koneksi internet stabil', allowed: true },
  { text: 'Bacalah setiap soal dengan teliti', allowed: true },
  { text: 'Jawaban akan tersimpan saat tombol simpan ditekan', allowed: true },
  { text: 'Timer akan berjalan otomatis setelah ujian dimulai', allowed: true },
  { text: 'Jangan menutup browser selama ujian berlangsung', allowed: false },
  { text: 'Anda hanya dapat mengikuti ujian ini satu kali', allowed: false },
]

export function ExamInfoView({ exam }: { exam: Exam }) {
  const router = useRouter()
  const { startExam } = useExamStore()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [starting, setStarting] = useState(false)

  function handleStart() {
    setStarting(true)
    startExam(exam.slug)
    router.push(`/ujian/${exam.slug}/session`)
  }

  const info = [
    { icon: GraduationCap, label: 'Jenjang Jabatan', value: exam.level },
    { icon: Clock, label: 'Durasi', value: `${exam.durationMinutes} menit` },
    { icon: FileText, label: 'Total Soal', value: `${exam.totalQuestions} soal` },
    { icon: Target, label: 'Passing Grade', value: String(exam.passingGrade) },
  ]

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/dashboard" className="hover:text-foreground hover:underline">
              Daftar Ujian
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground">Informasi Ujian</li>
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="flex flex-col gap-3 bg-primary px-6 py-6 text-primary-foreground md:px-8">
            <div className="flex items-center gap-2 text-xs text-primary-foreground/75">
              <CalendarDays className="size-4" aria-hidden="true" />
              {exam.date}
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-balance md:text-3xl">
              {exam.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-primary-foreground/80 text-pretty">
              {exam.description}
            </p>
          </div>

          <div className="flex flex-col gap-8 p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-bold tracking-wide text-muted-foreground uppercase">
                Informasi Ujian
              </h2>
              <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {info.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col gap-2 rounded-lg border p-4">
                    <Icon className="size-5 text-brand-bright" aria-hidden="true" />
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="text-base font-bold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-muted-foreground uppercase">
                <BookOpen className="size-4" aria-hidden="true" />
                Materi Ujian
              </h2>
              <ul className="flex flex-col divide-y rounded-lg border">
                {exam.materials.map((m) => (
                  <li key={m.code} className="flex items-center justify-between gap-4 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Badge className="w-12 justify-center bg-secondary font-mono text-secondary-foreground">
                        {m.code}
                      </Badge>
                      <span className="text-sm font-medium">{m.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {m.count} soal
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Soal diambil secara acak dari bank soal. Urutan soal dan pilihan jawaban
                berbeda untuk setiap peserta.
              </p>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="rounded-xl border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-base font-bold">
              <AlertTriangle className="size-5 text-destructive" aria-hidden="true" />
              Perhatian Penting
            </h2>
            <ul className="flex flex-col gap-3">
              {rules.map((rule) => (
                <li key={rule.text} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span
                    className={cn(
                      'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
                      rule.allowed
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-destructive/10 text-destructive',
                    )}
                  >
                    {rule.allowed ? (
                      <Check className="size-3" aria-label="Lakukan" />
                    ) : (
                      <X className="size-3" aria-label="Perhatian" />
                    )}
                  </span>
                  {rule.text}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3 rounded-xl border bg-card p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pastikan Anda telah membaca seluruh informasi sebelum memulai.
            </p>
            <Separator />
            <Button size="lg" className="h-11" onClick={() => setConfirmOpen(true)}>
              <Play />
              Mulai Ujian
            </Button>
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-11')}
            >
              <ArrowLeft />
              Kembali
            </Link>
          </section>
        </aside>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="gap-5 p-6 sm:max-w-md">
          <DialogHeader>
            <span className="mb-2 flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Play className="size-5" aria-hidden="true" />
            </span>
            <DialogTitle className="text-lg font-bold">Mulai Ujian</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              Apakah Anda yakin ingin memulai ujian?
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg bg-muted p-4 text-sm">
            <p className="mb-2 font-semibold">Setelah memulai ujian:</p>
            <ul className="flex list-disc flex-col gap-1 pl-5 leading-relaxed text-muted-foreground">
              <li>Timer akan berjalan otomatis</li>
              <li>Anda tidak dapat mengulangi ujian</li>
              <li>Pastikan koneksi internet stabil</li>
            </ul>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="lg" className="h-10" onClick={() => setConfirmOpen(false)}>
              Batal
            </Button>
            <Button size="lg" className="h-10" onClick={handleStart} disabled={starting}>
              {starting ? 'Menyiapkan soal…' : 'Ya, Mulai Ujian'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
