'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TIMELINE } from '@/data/timeline'
import { TimelineCard } from '@/components/molecules/TimelineCard'
import { fillProgressOnScroll, revealFromSide } from '@/lib/gsap/revealTimeline'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Timeline() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.timeline-item')

      items.forEach(item => {
        const side = item.dataset.side === 'left' ? 'left' : 'right'
        revealFromSide(item, side)

        const fill = item.querySelector<HTMLElement>('.progress-fill')
        if (!fill) return
        const progress = Number(fill.dataset.progress ?? '0')
        fillProgressOnScroll(fill, progress)
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-linear-to-b from-transparent via-gold/30 to-transparent md:block" />
      <div className="pointer-events-none absolute right-4 top-0 h-full w-px bg-linear-to-b from-transparent via-gold/30 to-transparent md:hidden" />

      <div className="flex flex-col gap-12 md:gap-16">
        {TIMELINE.map((item, i) => (
          <TimelineCard
            key={item.year}
            item={item}
            side={i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </section>
  )
}