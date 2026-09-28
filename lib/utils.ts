import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Merangkas rentang tanggal "12 Oktober 2026" - "16 Oktober 2026" menjadi
 * "12–16 Oktober 2026" saat bulan & tahunnya sama, atau "26 Nov - 2 Des 2026"
 * saat bulannya berbeda. Jatuh kembali ke format lengkap bila tidak cocok.
 */
export function formatDateRange(start: string, end: string) {
  const parse = (value: string) => {
    const [day, month, year] = value.split(' ')
    return { day, month, year }
  }

  const a = parse(start)
  const b = parse(end)

  if (!a.day || !a.month || !a.year || !b.day || !b.month || !b.year) {
    return `${start} - ${end}`
  }

  if (a.month === b.month && a.year === b.year) {
    return `${a.day}–${b.day} ${a.month} ${a.year}`
  }

  if (a.year === b.year) {
    return `${a.day} ${a.month} - ${b.day} ${b.month} ${a.year}`
  }

  return `${start} - ${end}`
}
