'use client'

import {ButtonHTMLAttributes , forwardRef}  from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        gold:
          'bg-gradient-to-b from-[#f1d68a] via-[#c9a227] to-[#8a6f14] text-black shadow-[0_6px_20px_-6px_rgba(201,162,39,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(201,162,39,0.75),inset_0_1px_0_rgba(255,255,255,0.5)]',
        outline:
          'border border-gold/50 bg-white/[0.03] text-gold-soft backdrop-blur-sm hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:shadow-[0_10px_30px_-12px_rgba(201,162,39,0.65)]',
        ghost: 'text-white/70 hover:text-gold',
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-base',
      },
    },
    defaultVariants: { variant: 'gold', size: 'md' },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
)
Button.displayName = 'Button'