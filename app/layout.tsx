import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { ExamProvider } from '@/components/exam-provider'
import './globals.css'

const _jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })
const _mono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CAT SIM JF — Computer Assisted Test Jabatan Fungsional',
  description:
    'Sistem ujian berbasis komputer untuk peserta seleksi dan pengangkatan Jabatan Fungsional.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#003d62',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-background">
      <body className="font-sans antialiased">
        <ExamProvider>{children}</ExamProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
