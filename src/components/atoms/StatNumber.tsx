'use client'
import { useEffect, useRef, useState } from 'react'
import { toPersianDigits } from '@/lib/utils'

interface Props {
  value: number
  suffix?: string
  duration?: number
}

export function StatNumber({ value, suffix = '', duration = 1.8 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let cancelled = false

    const io = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return
        io.disconnect()

        const start = performance.now()
        const step = (now: number) => {
          if (cancelled) return
          const t = Math.min(1, (now - start) / (duration * 1000))
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(Math.round(eased * value))
          if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [value, duration])

  return (
    <span ref={ref}>
      {toPersianDigits(display.toLocaleString('en-US'))}
      {suffix}
    </span>
  )
}