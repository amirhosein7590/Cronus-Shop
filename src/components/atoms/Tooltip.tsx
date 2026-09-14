'use client'
import { cn } from '@/lib/utils'

interface TooltipProps {
  title: string
  body: string
  visible: boolean
  side?: 'left' | 'right'
}

export function Tooltip({ title, body, visible, side = 'right' }: TooltipProps) {
  const bullet = (
    <span className="relative flex h-3.5 w-3.5 animate-ping items-center justify-center rounded-full border border-yellow-500 md:h-4 md:w-4">
      <span className="absolute inset-0" />
      <span className="absolute -inset-1 rounded-full border-0 border border-gold/50" />
      <span className="relative h-2 w-2 rounded-full bg-gold shadow-[0_0_14px_rgba(201,162,39,0.95)] md:h-2.5 md:w-2.5" />
    </span>
  )

  const line = <span className="h-px w-8 bg-yellow-500 md:w-20" />

  const card = (
    <div
      dir="rtl"
      className={cn(
        'relative w-[min(58vw,300px)] rounded-2xl border border-gold/40 px-4 py-4 backdrop-blur-xl md:w-[min(88vw,420px)] md:px-6 md:py-5',
        'bg-[#0a0a0c]/95',
        'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_-12px_rgba(201,162,39,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]'
      )}
    >
      <h3 className="mb-2 text-base font-semibold tracking-wide text-gold-soft md:mb-3 md:text-lg">
        {title}
      </h3>
      <p className="text-sm leading-7 text-white/85 md:text-base md:leading-8">{body}</p>
    </div>
  )

  return (
    <div
      dir="ltr"
      className={cn(
        'flex items-center gap-2 transition-all duration-500 will-change-transform',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      )}
    >
      {side === 'right' ? (
        <>
          <div className="flex items-center">
            {bullet}
            {line}
          </div>
          {card}
        </>
      ) : (
        <>
          {card}
          <div className="flex items-center">
            {line}
            {bullet}
          </div>
        </>
      )}
    </div>
  )
}