'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toPersianDigits } from '@/lib/utils'
import { drawSvgPath, popIn, revealFrom } from '@/lib/gsap/revealTimeline'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SERIES = [
  { year: '۱۳۸۵', value: 1 },
  { year: '۱۳۸۹', value: 4 },
  { year: '۱۳۹۲', value: 12 },
  { year: '۱۳۹۵', value: 22 },
  { year: '۱۳۹۸', value: 34 },
  { year: '۱۴۰۱', value: 52 },
  { year: '۱۴۰۳', value: 78 },
]

const W = 800
const H = 280
const PAD = 40

export function GrowthChart() {
  const ref = useRef<SVGSVGElement>(null)

  const max = Math.max(...SERIES.map(s => s.value))
  const stepX = (W - PAD * 2) / (SERIES.length - 1)
  const points = SERIES.map((s, i) => {
    const x = PAD + i * stepX
    const y = H - PAD - (s.value / max) * (H - PAD * 2)
    return { x, y, ...s }
  })

  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')

 useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const pathEl = svg.querySelector<SVGPathElement>('.growth-path')
    if (!pathEl) return

    const ctx = gsap.context(() => {
      drawSvgPath(pathEl, { duration: 2 })
      popIn('.growth-dot', { trigger: svg, delay: 0.6, stagger: 0.12 })
      revealFrom({
        targets: '.growth-label',
        trigger: svg,
        start: 'top 80%',
        y: 10,
        blur: 0,
        delay: 0.6,
        stagger: 0.12,
      })
    }, svg)

    return () => ctx.revert()
  }, [])

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="glass overflow-hidden rounded-3xl p-6">
        <h3 className="mb-2 text-lg font-semibold text-gold-soft">نمودار رشد</h3>
        <p className="mb-6 text-sm text-white/60">شاخص ترکیبی رشد کسب‌وکار در طول سال‌ها</p>
        <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="نمودار رشد">
          <defs>
            <linearGradient id="gLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8a6f14" />
              <stop offset="100%" stopColor="#e5c766" />
            </linearGradient>
          </defs>

          {/* grid */}
          {[0.25, 0.5, 0.75, 1].map(t => (
            <line
              key={t}
              x1={PAD}
              x2={W - PAD}
              y1={H - PAD - t * (H - PAD * 2)}
              y2={H - PAD - t * (H - PAD * 2)}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="4 6"
            />
          ))}

          <path className="growth-path" d={path} fill="none" stroke="url(#gLine)" strokeWidth={2.5} strokeLinecap="round" />

          {points.map(p => (
            <g key={p.year}>
              <circle className="growth-dot" cx={p.x} cy={p.y} r={5} fill="#e5c766" />
              <text
                className="growth-label"
                x={p.x}
                y={H - PAD + 22}
                textAnchor="middle"
                fill="rgba(255,255,255,0.55)"
                fontSize={12}
              >
                {p.year}
              </text>
              <text
                className="growth-label"
                x={p.x}
                y={p.y - 14}
                textAnchor="middle"
                fill="#e5c766"
                fontSize={12}
              >
                {toPersianDigits(p.value)}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}