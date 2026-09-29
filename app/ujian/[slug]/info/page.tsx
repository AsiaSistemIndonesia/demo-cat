import { notFound } from 'next/navigation'
import { AppHeader } from '@/components/app-header'
import { ExamInfoView } from '@/components/exam-info/exam-info-view'
import { getExam } from '@/lib/mock-data'
import { getParticipant } from '@/lib/session'

export async function generateMetadata({ params }: PageProps<'/ujian/[slug]/info'>) {
  const { slug } = await params
  return { title: `${getExam(slug)?.title ?? 'Ujian'} — Informasi — CAT SIM JF` }
}

export default async function ExamInfoPage({ params }: PageProps<'/ujian/[slug]/info'>) {
  const { slug } = await params
  const exam = getExam(slug)
  if (!exam) notFound()

  const participant = await getParticipant()

  return (
    <div className="min-h-dvh">
      <AppHeader participant={participant} />
      <ExamInfoView exam={exam} />
    </div>
  )
}
