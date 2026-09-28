import { notFound } from 'next/navigation'
import { ExamSession } from '@/components/exam-session/exam-session'
import { getExam, participant, questionBank } from '@/lib/mock-data'

export async function generateMetadata({ params }: PageProps<'/ujian/[slug]/session'>) {
  const { slug } = await params
  return { title: `${getExam(slug)?.title ?? 'Ujian'} — Sesi Ujian — CAT SIM JF` }
}

export default async function ExamSessionPage({ params }: PageProps<'/ujian/[slug]/session'>) {
  const { slug } = await params
  const exam = getExam(slug)
  if (!exam) notFound()

  return <ExamSession exam={exam} bank={questionBank} participantName={participant.name} />
}
