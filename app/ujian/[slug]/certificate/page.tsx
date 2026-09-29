import { notFound } from 'next/navigation'
import { CertificateView } from '@/components/certificate/certificate-view'
import { getExam } from '@/lib/mock-data'
import { getParticipant } from "@/lib/session";

export async function generateMetadata({ params }: PageProps<'/ujian/[slug]/certificate'>) {
  const { slug } = await params
  return { title: `Sertifikat ${getExam(slug)?.title ?? 'Ujian'} — CAT SIM JF` }
}

export default async function CertificatePage({ params }: PageProps<'/ujian/[slug]/certificate'>) {
  const { slug } = await params
  const exam = getExam(slug)
  if (!exam) notFound()

  const participant = await getParticipant()
  return <CertificateView exam={exam} participant={participant} />
}
