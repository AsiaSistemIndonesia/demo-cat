import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";
import { ExamList } from "@/components/dashboard/exam-list";
import { exams, participant } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Daftar Ujian — CAT SIM JF" };

export default function DashboardPage() {
  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-balance md:text-3xl">
              Daftar Ujian
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pilih ujian yang tersedia untuk Anda
            </p>
          </div>
          {/* <dl className="flex flex-col gap-0.5 text-sm md:items-end">
            <dt className="text-xs text-muted-foreground">Nomor Peserta</dt>
            <dd className="font-mono font-semibold">{participant.id}</dd>
          </dl> */}
        </div>

        <ExamList exams={exams} />
      </main>
    </div>
  );
}
