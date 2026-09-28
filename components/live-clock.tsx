'use client'

import { useEffect, useState } from 'react'

const timeFormat = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Asia/Jakarta',
})

const dateFormat = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
})

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-end leading-tight">
      <time
        className="font-mono text-sm font-semibold tabular-nums text-foreground"
        suppressHydrationWarning
      >
        {now ? `${timeFormat.format(now).replaceAll('.', ':')} WIB` : '--:--:-- WIB'}
      </time>
      <span className="text-xs text-muted-foreground">
        {now ? dateFormat.format(now) : '\u00A0'}
      </span>
    </div>
  )
}
