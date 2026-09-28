"use client";

import Link from "next/link";
import { ArrowLeft, BadgeCheck, CircleX, Download } from "lucide-react";
import { useExamStore } from "@/components/exam-provider";
import { buttonVariants } from "@/components/ui/button";
import { formatDateTime, formatDuration } from "@/lib/exam-engine";
import { mockResult, type Exam } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ResultView({
  exam,
  participantName,
}: {
  exam: Exam;
  participantName: string;
}) {
  const { results } = useExamStore();
  const result = results[exam.slug] ?? {
    ...mockResult,
    slug: exam.slug,
    passingGrade: exam.passingGrade,
  };

  const passingPercent = (result.passingGrade / result.maxScore) * 100;
  const scorePercent = (result.score / result.maxScore) * 100;

  const details = [
    { label: "Nama Ujian", value: exam.title },
    { label: "Nama Peserta", value: participantName },
    { label: "Waktu Mulai", value: formatDateTime(result.startedAt) },
    { label: "Waktu Selesai", value: formatDateTime(result.finishedAt) },
    {
      label: "Durasi Pengerjaan",
      value: formatDuration(result.finishedAt - result.startedAt),
    },
    { label: "Total Soal", value: `${result.total} soal` },
    { label: "Jumlah Benar", value: `${result.correct} soal` },
    {
      label: "Jumlah Salah",
      value: `${result.wrong} soal${result.unanswered ? ` (${result.unanswered} tidak dijawab)` : ""}`,
    },
    { label: "Passing Grade", value: String(result.passingGrade) },
    { label: "Nilai Akhir", value: String(result.score) },
  ];

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:px-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          Hasil Ujian
        </h1>
        <p className="text-sm text-muted-foreground">{exam.title}</p>
      </div>

      <section
        aria-label="Ringkasan nilai"
        className="grid overflow-hidden rounded-xl border bg-card md:grid-cols-[1fr_1.3fr]"
      >
        <div className="flex flex-col items-start justify-center gap-4 bg-primary p-6 text-primary-foreground md:p-8">
          <span className="text-xs font-semibold tracking-wider text-primary-foreground/70 uppercase">
            Nilai Akhir
          </span>
          <p className="flex items-baseline gap-2">
            <span className="font-mono text-7xl font-bold tracking-tight tabular-nums">
              {result.score}
            </span>
            <span className="font-mono text-lg text-primary-foreground/60">
              / {result.maxScore}
            </span>
          </p>
          <div
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold",
              result.passed
                ? "bg-primary-foreground text-primary"
                : "bg-destructive text-primary-foreground",
            )}
          >
            {result.passed ? (
              <BadgeCheck className="size-5" aria-hidden="true" />
            ) : (
              <CircleX className="size-5" aria-hidden="true" />
            )}
            {result.passed
              ? "Memenuhi Passing Grade"
              : "Tidak Memenuhi Passing Grade"}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-8 p-6 md:p-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold">
                Posisi Nilai terhadap Passing Grade
              </span>
              <span
                className={cn(
                  "font-mono text-sm font-bold tabular-nums",
                  result.passed ? "text-primary" : "text-destructive",
                )}
              >
                {/* {result.score - result.passingGrade >= 0 ? "+" : ""} */}
                {/* {result.score - result.passingGrade} */}
              </span>
            </div>

            <div className="relative pt-5 pb-6">
              <div className="h-4 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    result.passed ? "bg-primary" : "bg-destructive",
                  )}
                  style={{ width: `${scorePercent}%` }}
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute top-2 h-8 w-0.5 -translate-x-1/2 bg-foreground/70"
                style={{ left: `${passingPercent}%` }}
              />
              <div
                className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-0.5"
                style={{ left: `${passingPercent}%` }}
              >
                {/* <span className="text-[11px] font-medium whitespace-nowrap text-muted-foreground">
                  PG {result.passingGrade}
                </span> */}
              </div>
              <div className="absolute bottom-0 left-0 text-[11px] text-muted-foreground">
                0
              </div>
              <div className="absolute bottom-0 right-0 text-[11px] text-muted-foreground">
                {result.maxScore}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 px-4 py-3">
              <span className="text-xs text-muted-foreground">Nilai Anda</span>
              <span className="font-mono text-2xl font-bold tabular-nums">
                {result.score}
              </span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg border bg-muted/40 px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Passing Grade
              </span>
              <span className="font-mono text-2xl font-bold tabular-nums text-muted-foreground">
                {result.passingGrade}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card">
        <h2 className="border-b px-6 py-4 text-base font-bold">Detail Ujian</h2>
        <dl className="grid md:grid-cols-2">
          {details.map((d, i) => (
            <div
              key={d.label}
              className={cn(
                "flex flex-col gap-1 border-b px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
                i % 2 === 0 && "md:border-r",
                i >= details.length - 2 && "md:border-b-0",
                i === details.length - 1 && "border-b-0",
              )}
            >
              <dt className="text-sm text-muted-foreground">{d.label}</dt>
              <dd
                className={cn(
                  "text-sm font-semibold sm:text-right",
                  d.label === "Nilai Akhir" &&
                    "font-mono text-base text-primary",
                )}
              >
                {d.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-11 px-5",
          )}
        >
          <ArrowLeft />
          Kembali ke Dashboard
        </Link>
        <Link
          href={`/ujian/${exam.slug}/certificate`}
          className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
        >
          <Download />
          Download Sertifikat
        </Link>
      </div>
    </main>
  );
}
