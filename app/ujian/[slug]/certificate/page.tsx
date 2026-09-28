import { notFound } from 'next/navigation'
import { CertificateView } from '@/components/certificate/certificate-view'
import { getExam, participant } from '@/lib/mock-data'

export async function generateMetadata({ params }: PageProps<'/ujian/[slug]/certificate'>) {
  const { slug } = await params
  return { title: `Sertifikat ${getExam(slug)?.title ?? 'Ujian'} — CAT SIM JF` }
}

export default async function CertificatePage({ params }: PageProps<'/ujian/[slug]/certificate'>) {
  const { slug } = await params
  const exam = getExam(slug)
  if (!exam) notFound()

  return <CertificateView exam={exam} participant={participant} />
}
