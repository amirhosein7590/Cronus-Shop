'use client'
import { useRef } from 'react'
import type { TimelineItem } from '@/data/timeline'
import { toPersianDigits } from '@/lib/utils'
import { GoldDot } from '@/components/atoms/GoldDot'

interface Props {
  item: TimelineItem
  side: 'left' | 'right'
}

export function TimelineCard({ item, side }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }
  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'
  }

  return (
    <div
      className={`timeline-item relative w-full md:w-[calc(50%-2rem)] ${
        side === 'left' ? 'md:mr-auto md:pl-8' : 'md:ml-auto md:pr-8'
      }`}
      data-side={side}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="glass group rounded-2xl p-6 transition-transform duration-300 will-change-transform"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest text-gold-soft">
            {item.year}
          </span>
          <GoldDot />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
        <p className="mb-5 text-sm leading-7 text-white/65">{item.description}</p>

        <div className="mb-3 flex items-center justify-between text-xs text-white/60">
          <span>{item.metric.label}</span>
          <span className="text-gold-soft">
            {toPersianDigits(item.metric.value.toLocaleString('en-US'))}
            {item.metric.suffix ?? ''}
          </span>
        </div>

        <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="progress-fill h-full origin-right rounded-full bg-linear-to-l from-gold-soft to-gold"
            style={{ transform: `scaleX(0)` }}
            data-progress={item.progress}
          />
        </div>
      </div>
    </div>
  )
}