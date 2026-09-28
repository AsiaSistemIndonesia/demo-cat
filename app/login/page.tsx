import type { Metadata } from 'next'
import { BrandMark } from '@/components/brand-logo'
import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = { title: 'Login — CAT SIM JF' }

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-primary px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3 text-center text-primary-foreground">
          <BrandMark className="size-16 bg-primary-foreground text-xl text-primary" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight">CAT SIM JF</h1>
            <p className="text-sm text-primary-foreground/75">
              Computer Assisted Test — Sistem Informasi Jabatan Fungsional
            </p>
          </div>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-primary-foreground/70">
          {'© 2026 CAT SIM JF. Sistem ini hanya untuk peserta terdaftar.'}
        </p>
      </div>
    </main>
  )
}
