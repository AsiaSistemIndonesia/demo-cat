"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Mockup: tanpa autentikasi nyata, langsung ke dashboard.
    router.push("/dashboard");
  }

  return (
    <div className="w-full rounded-2xl border bg-card p-6 shadow-lg shadow-primary/10 md:p-8">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-lg font-bold text-foreground">Masuk Peserta</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Silakan login untuk mengakses ujian
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Masukkan username"
              // defaultValue="brigita01"
              className="h-11 pl-9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Masukkan password"
              // defaultValue="demo12345"
              className="h-11 px-9"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={
                showPassword ? "Sembunyikan password" : "Tampilkan password"
              }
              className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-11 text-sm"
          disabled={submitting}
        >
          <LogIn />
          {submitting ? "Memproses…" : "Login"}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <span>Gunakan akun dari panitia seleksi</span>
        <a href="#" className="font-semibold text-brand-bright hover:underline">
          Butuh bantuan?
        </a>
      </div>
    </div>
  );
}
