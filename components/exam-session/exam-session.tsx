'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useExamStore } from '@/components/exam-provider'
import { QuestionNav } from '@/components/exam-session/question-nav'
import { QuestionPanel } from '@/components/exam-session/question-panel'
import { SessionHeader } from '@/components/exam-session/session-header'
import { SubmitDialog } from '@/components/exam-session/submit-dialog'
import { buildExamQuestions, scoreExam } from '@/lib/exam-engine'
import type { BankQuestion, Exam } from '@/lib/mock-data'

/** Seed tetap untuk demo ketika halaman sesi dibuka langsung tanpa melalui konfirmasi. */
const FALLBACK_SEED = 20261012

export function ExamSession({
  exam,
  bank,
  participantName,
}: {
  exam: Exam
  bank: BankQuestion[]
  participantName: string
}) {
  const router = useRouter()
  const { attempts, startExam, completeExam } = useExamStore()
  const attempt = attempts[exam.slug]
  const seed = attempt?.seed ?? FALLBACK_SEED

  const questions = useMemo(() => buildExamQuestions(bank, exam, seed), [bank, exam, seed])

  const [index, setIndex] = useState(0)
  const [saved, setSaved] = useState<Record<string, string>>({})
  const [draft, setDraft] = useState<string | null>(null)
  const [justSaved, setJustSaved] = useState(false)
  const [finalized, setFinalized] = useState(false)
  const [submitOpen, setSubmitOpen] = useState(false)
  const [now, setNow] = useState<number | null>(null)
  const finishing = useRef(false)

  useEffect(() => {
    if (!attempt) startExam(exam.slug, FALLBACK_SEED)
  }, [attempt, exam.slug, startExam])

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const durationSeconds = exam.durationMinutes * 60
  const remaining =
    attempt && now !== null
      ? durationSeconds - Math.floor((now - attempt.startedAt) / 1000)
      : durationSeconds

  const current = questions[index]
  const selected = draft ?? saved[current.key] ?? null
  const isDirty = draft !== null && draft !== saved[current.key]
  const answeredCount = Object.keys(saved).length
  const isLast = index === questions.length - 1

  const finish = useCallback(() => {
    if (finishing.current) return
    finishing.current = true
    setFinalized(true)
    setSubmitOpen(false)
    const startedAt = attempt?.startedAt ?? Date.now()
    completeExam(scoreExam(exam, questions, saved, startedAt, Date.now()))
    router.push(`/ujian/${exam.slug}/result`)
  }, [attempt, completeExam, exam, questions, router, saved])

  useEffect(() => {
    if (attempt && remaining <= 0) finish()
  }, [attempt, remaining, finish])

  const goTo = (next: number) => {
    if (next < 0 || next >= questions.length) return
    setDraft(null)
    setJustSaved(false)
    setIndex(next)
  }

  const saveCurrent = () => {
    if (finalized || selected === null) return
    setSaved((prev) => ({ ...prev, [current.key]: selected }))
    setDraft(null)
    setJustSaved(true)
  }

  const answeredKeys = useMemo(() => new Set(Object.keys(saved)), [saved])

  return (
    <div className="flex min-h-dvh flex-col">
      <SessionHeader
        title={exam.title}
        participantName={participantName}
        remainingSeconds={remaining}
        answered={answeredCount}
        total={questions.length}
      />

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 md:px-6 lg:grid-cols-[340px_1fr]">
        <QuestionNav
          questions={questions}
          currentIndex={index}
          answeredKeys={answeredKeys}
          onSelect={goTo}
          onSubmit={() => setSubmitOpen(true)}
          disabled={finalized}
        />

        <QuestionPanel
          question={current}
          index={index}
          total={questions.length}
          selected={selected}
          isSaved={!isDirty && saved[current.key] !== undefined}
          isDirty={isDirty}
          justSaved={justSaved && !isDirty}
          isLast={isLast}
          disabled={finalized}
          onSelect={(optionId) => {
            setDraft(optionId)
            setJustSaved(false)
          }}
          onPrev={() => goTo(index - 1)}
          onSkip={() => goTo(index + 1)}
          onSave={saveCurrent}
          onSaveNext={() => {
            saveCurrent()
            goTo(index + 1)
          }}
          onSubmit={() => {
            if (isDirty) saveCurrent()
            setSubmitOpen(true)
          }}
        />
      </main>

      <SubmitDialog
        open={submitOpen}
        onOpenChange={setSubmitOpen}
        answered={answeredCount}
        total={questions.length}
        onConfirm={finish}
      />
    </div>
  )
}
