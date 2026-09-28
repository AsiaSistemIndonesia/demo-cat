/**
 * SIMULASI FRONT-END SAJA.
 * Pada sistem produksi, pengambilan & pengacakan soal dilakukan di server
 * agar kunci jawaban tidak pernah dikirim ke browser.
 */
import type {
  BankQuestion,
  Category,
  Exam,
  ExamResult,
  QuestionOption,
} from '@/lib/mock-data'

export const SIMULATED_BANK_SIZE = 7000

export type ExamQuestion = {
  key: string
  bankNumber: number
  category: Category
  text: string
  options: QuestionOption[]
}

export function createRng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffle<T>(items: T[], rng: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Mengambil N soal per kategori dari bank soal, mengacak urutan soal,
 * lalu mengacak urutan pilihan jawaban tiap soal.
 * Karena bank contoh hanya berisi 15 soal, soal diulang (dengan nomor bank
 * berbeda) untuk mensimulasikan pengambilan dari 7.000 soal.
 */
export function buildExamQuestions(
  bank: BankQuestion[],
  exam: Exam,
  seed: number,
): ExamQuestion[] {
  const rng = createRng(seed)
  const usedBankNumbers = new Set<number>()
  const picked: ExamQuestion[] = []

  for (const material of exam.materials) {
    const pool = shuffle(
      bank.filter((q) => q.category === material.code),
      rng,
    )
    for (let i = 0; i < material.count && pool.length > 0; i++) {
      const source = pool[i % pool.length]
      let bankNumber = Math.floor(rng() * SIMULATED_BANK_SIZE) + 1
      while (usedBankNumbers.has(bankNumber)) {
        bankNumber = (bankNumber % SIMULATED_BANK_SIZE) + 1
      }
      usedBankNumbers.add(bankNumber)
      picked.push({
        key: `${source.id}#${bankNumber}`,
        bankNumber,
        category: source.category,
        text: source.text,
        options: shuffle(source.options, rng),
      })
    }
  }

  return shuffle(picked, rng)
}

export function scoreExam(
  exam: Exam,
  questions: ExamQuestion[],
  answers: Record<string, string>,
  startedAt: number,
  finishedAt: number,
): ExamResult {
  let score = 0
  let correct = 0
  let wrong = 0
  let unanswered = 0
  const byCategory = new Map<Category, { score: number; max: number }>()

  for (const q of questions) {
    const bucket = byCategory.get(q.category) ?? { score: 0, max: 0 }
    bucket.max += 5
    const selected = q.options.find((o) => o.id === answers[q.key])
    if (!selected) {
      unanswered++
    } else {
      score += selected.score
      bucket.score += selected.score
      if (selected.score === 5) correct++
      else wrong++
    }
    byCategory.set(q.category, bucket)
  }

  return {
    slug: exam.slug,
    score,
    maxScore: questions.length * 5,
    correct,
    wrong,
    unanswered,
    total: questions.length,
    passingGrade: exam.passingGrade,
    passed: score >= exam.passingGrade,
    startedAt,
    finishedAt,
    categoryScores: exam.materials.map((m) => ({
      code: m.code,
      ...(byCategory.get(m.code) ?? { score: 0, max: 0 }),
    })),
  }
}

export function formatCountdown(totalSeconds: number) {
  const s = Math.max(0, totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return [h, m, sec].map((n) => String(n).padStart(2, '0')).join(':')
}

export function formatDateTime(timestamp: number) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeStyle: 'medium',
    timeZone: 'Asia/Jakarta',
  }).format(timestamp)
}

export function formatDuration(ms: number) {
  const totalMinutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return h > 0 ? `${h} jam ${m} menit ${seconds} detik` : `${m} menit ${seconds} detik`
}
