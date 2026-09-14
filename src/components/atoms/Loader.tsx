'use client'
import { cn } from '@/lib/utils'

export function Loader({ hidden, className }: { hidden?: boolean; className?: string }) {
  return (
    <div
      aria-hidden={hidden}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700',
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100',
        className
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border border-gold/25" />
          <div className="absolute inset-0 animate-spin rounded-full border-t-2 border-gold" />
        </div>
        <p className="text-sm tracking-widest text-white/60">در حال آماده‌سازی</p>
      </div>
    </div>
  )
}