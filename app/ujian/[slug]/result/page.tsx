import { notFound } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { ResultView } from '@/components/result/result-view'
import { getExam, participant } from '@/lib/mock-data'

export async function generateMetadata({ params }: PageProps<'/ujian/[slug]/result'>) {
  const { slug } = await params
  return { title: `Hasil ${getExam(slug)?.title ?? 'Ujian'} — CAT SIM JF` }
}

export default async function ResultPage({ params }: PageProps<'/ujian/[slug]/result'>) {
  const { slug } = await params
  const exam = getExam(slug)
  if (!exam) notFound()

  return (
    <div className="min-h-dvh">
      <AppHeader />
      <ResultView exam={exam} participantName={participant.name} />
    </div>
  )
}
