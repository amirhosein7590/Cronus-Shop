'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'

const links = [
  { href: '/', label: 'خانه' },
  { href: '/about', label: 'درباره ما' },
  { href: '#contact', label: 'تماس' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-30 transition-colors duration-500',
        scrolled ? 'bg-black/60 backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      {/* Fading bottom hairline, kept separate so it can fade independently */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent transition-opacity duration-500',
          scrolled ? 'opacity-100' : 'opacity-0'
        )}
      />
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold shadow-gold" />
          <span className="text-lg font-semibold tracking-widest gold-gradient-text">
            کرونوس
          </span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-white/70 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button variant="outline" size="sm">
          مشاوره رایگان
        </Button>
      </nav>
    </header>
  )
}