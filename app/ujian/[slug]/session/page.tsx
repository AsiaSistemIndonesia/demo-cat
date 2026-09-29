import { notFound } from 'next/navigation'
import { ExamSession } from '@/components/exam-session/exam-session'
import { getExam, questionBank } from '@/lib/mock-data'
import { getParticipant } from "@/lib/session";

export async function generateMetadata({ params }: PageProps<'/ujian/[slug]/session'>) {
  const { slug } = await params
  return { title: `${getExam(slug)?.title ?? 'Ujian'} — Sesi Ujian — CAT SIM JF` }
}

export default async function ExamSessionPage({ params }: PageProps<'/ujian/[slug]/session'>) {
  const { slug } = await params
  const exam = getExam(slug)
  if (!exam) notFound()

  const participant = await getParticipant()
  return <ExamSession exam={exam} bank={questionBank} participantName={participant.name} />
}
