'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ExamResult } from '@/lib/mock-data'

type Attempt = { seed: number; startedAt: number }

type ExamContextValue = {
  attempts: Record<string, Attempt>
  results: Record<string, ExamResult>
  startExam: (slug: string, seed?: number) => void
  completeExam: (result: ExamResult) => void
}

const ExamContext = createContext<ExamContextValue | null>(null)

/** State ujian disimpan di memori browser saja (mockup, tanpa backend). */
export function ExamProvider({ children }: { children: React.ReactNode }) {
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({})
  const [results, setResults] = useState<Record<string, ExamResult>>({})

  const startExam = useCallback((slug: string, seed?: number) => {
    const startedAt = Date.now()
    setAttempts((prev) => ({
      ...prev,
      [slug]: { seed: seed ?? startedAt, startedAt },
    }))
  }, [])

  const completeExam = useCallback((result: ExamResult) => {
    setResults((prev) => ({ ...prev, [result.slug]: result }))
  }, [])

  const value = useMemo(
    () => ({ attempts, results, startExam, completeExam }),
    [attempts, results, startExam, completeExam],
  )

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>
}

export function useExamStore() {
  const ctx = useContext(ExamContext)
  if (!ctx) throw new Error('useExamStore must be used within ExamProvider')
  return ctx
}
