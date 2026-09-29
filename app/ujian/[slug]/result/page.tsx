import { notFound } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { ResultView } from '@/components/result/result-view'
import { getExam } from '@/lib/mock-data'
import { getParticipant } from "@/lib/session";

export async function generateMetadata({ params }: PageProps<'/ujian/[slug]/result'>) {
  const { slug } = await params
  return { title: `Hasil ${getExam(slug)?.title ?? 'Ujian'} — CAT SIM JF` }
}

export default async function ResultPage({ params }: PageProps<'/ujian/[slug]/result'>) {
  const { slug } = await params
  const exam = getExam(slug)
  if (!exam) notFound()

  const participant = await getParticipant()
  return (
    <div className="min-h-dvh">
      <AppHeader participant={participant} />
      <ResultView exam={exam} participantName={participant.name} />
    </div>
  )
}
