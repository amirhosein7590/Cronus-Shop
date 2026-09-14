import { cn } from '@/lib/utils'

export function GoldDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-flex h-3 w-3', className)}>
      <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-gold shadow-gold" />
    </span>
  )
}