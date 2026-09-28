'use client'

import Link from 'next/link'
import { ArrowLeft, Printer } from 'lucide-react'
import { BrandMark } from '@/components/brand-logo'
import { useExamStore } from '@/components/exam-provider'
import { Button, buttonVariants } from '@/components/ui/button'
import { mockResult, type Exam, type Participant } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function CertificateView({ exam, participant }: { exam: Exam; participant: Participant }) {
  const { results } = useExamStore()
  const result = results[exam.slug] ?? { ...mockResult, passingGrade: exam.passingGrade }
  const certificateNo = `CAT-JF/${String(result.finishedAt).slice(-6)}/X/2026`

  return (
    <div className="flex min-h-dvh flex-col items-center gap-6 bg-muted px-4 py-8 print:block print:bg-card print:p-0">
      <div className="flex w-full max-w-5xl items-center justify-between gap-3 print:hidden">
        <Link
          href={`/ujian/${exam.slug}/result`}
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'h-10')}
        >
          <ArrowLeft />
          Kembali
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-muted-foreground md:block">
            {'Pilih "Simpan sebagai PDF" pada dialog cetak'}
          </p>
          <Button size="lg" className="h-10" onClick={() => window.print()}>
            <Printer />
            Cetak / Simpan PDF
          </Button>
        </div>
      </div>

      <article
        aria-label="Sertifikat Hasil Ujian"
        className="aspect-[297/210] w-full max-w-5xl bg-card p-4 shadow-xl print:h-dvh print:max-w-none print:shadow-none md:p-6"
      >
        <div className="flex h-full flex-col border-4 border-double border-primary p-6 md:p-10">
          <header className="flex items-center justify-between gap-4 border-b border-primary/20 pb-4">
            <div className="flex items-center gap-3">
              <BrandMark className="size-12 text-base" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-extrabold tracking-tight text-primary">CAT SIM JF</span>
                <span className="text-xs text-muted-foreground">
                  Computer Assisted Test Jabatan Fungsional
                </span>
              </div>
            </div>
            <span className="font-mono text-xs text-muted-foreground">No. {certificateNo}</span>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4 text-center">
            <h1 className="text-xl font-extrabold tracking-[0.2em] text-primary uppercase md:text-3xl">
              Sertifikat Hasil Ujian
            </h1>
            <p className="text-sm text-muted-foreground">Diberikan kepada</p>
            <p className="border-b-2 border-primary px-6 pb-1 text-xl font-bold text-balance md:text-3xl">
              {participant.name}
            </p>
            <p className="font-mono text-xs text-muted-foreground">NIP. {participant.nip}</p>
            <p className="max-w-2xl text-sm leading-relaxed text-pretty">
              telah mengikuti <strong>{exam.title}</strong> jenjang <strong>{exam.level}</strong>{' '}
              yang dilaksanakan pada {exam.date} melalui sistem Computer Assisted Test dengan hasil
              sebagai berikut:
            </p>

            <dl className="mt-2 grid grid-cols-3 divide-x divide-primary/20 rounded-lg border border-primary/20">
              <div className="flex flex-col gap-1 px-6 py-3">
                <dt className="text-xs text-muted-foreground">Nilai Akhir</dt>
                <dd className="font-mono text-2xl font-bold text-primary">{result.score}</dd>
              </div>
              <div className="flex flex-col gap-1 px-6 py-3">
                <dt className="text-xs text-muted-foreground">Passing Grade</dt>
                <dd className="font-mono text-2xl font-bold">{result.passingGrade}</dd>
              </div>
              <div className="flex flex-col gap-1 px-6 py-3">
                <dt className="text-xs text-muted-foreground">Status</dt>
                <dd
                  className={cn(
                    'text-sm font-bold uppercase md:text-base',
                    result.passed ? 'text-primary' : 'text-destructive',
                  )}
                >
                  {result.passed ? 'Lulus' : 'Tidak Lulus'}
                </dd>
              </div>
            </dl>
          </div>

          <footer className="flex items-end justify-between gap-6 pt-4">
            <div className="flex size-24 items-center justify-center rounded-full border-2 border-dashed border-primary/40 text-center text-[0.6rem] font-semibold tracking-wider text-primary/60 uppercase">
              Stempel
              <br />
              Instansi
            </div>
            <div className="flex flex-col items-center gap-1 text-center text-xs">
              <span className="text-muted-foreground">Medan, {exam.date}</span>
              <span className="font-semibold">Ketua Panitia Seleksi</span>
              <span aria-hidden="true" className="my-3 h-10 w-44 border-b border-foreground/60" />
              <span className="font-semibold">Dr. Hendra Siregar, M.Si.</span>
              <span className="font-mono text-muted-foreground">NIP. 197805162003121002</span>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
}
