'use client'
import { useEffect, useRef } from 'react'

export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)
      el.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-0.5 bg-white/5">
      <div
        ref={ref}
        className="h-full origin-right bg-linear-to-l from-gold-soft to-gold"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}