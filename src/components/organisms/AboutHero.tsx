'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { revealFrom } from '@/lib/gsap/revealTimeline'

export function AboutHero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const ctx = gsap.context(() => {
      revealFrom({
        targets: '.about-line',
        y: 40,
        blur: 14,
        duration: 1.1,
        stagger: 0.18,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative z-10 flex min-h-[80vh] items-center">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="about-line mb-4 text-xs tracking-[0.4em] text-gold/80">
          از یک ویترین کوچک تا مرجع ساعت ایران
        </p>
        <h1 className="about-line text-balance text-4xl font-bold leading-tight md:text-6xl">
          <span className="text-white">مسیری که با </span>
          <span className="gold-gradient-text">زمان</span>
          <span className="text-white"> ساخته شد</span>
        </h1>
        <p className="about-line mx-auto mt-8 max-w-2xl text-sm leading-8 text-white/60 md:text-base">
          نوزده سال است که در کنار مشتریان‌مان ساعت‌های لوکس را با ضمانت اصالت، قیمت منصفانه و
          خدمات پس از فروش واقعی عرضه می‌کنیم. این صفحه روایت کوتاهی است از این مسیر.
        </p>
        <div className="about-line mt-14 flex flex-col items-center gap-3 text-xs text-white/40">
          <span>برای دیدن مسیر، اسکرول کنید</span>
          <span className="h-10 w-px animate-pulse bg-gold/60" />
        </div>
      </div>
    </section>
  )
}