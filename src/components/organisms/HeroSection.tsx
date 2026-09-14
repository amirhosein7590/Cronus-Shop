'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WatchScene } from '@/lib/three/watchScene'
import {
  createEntranceTimeline,
  createHeroFadeOut,
  createWaypointTimeline,
} from '@/lib/gsap/heroTimeline'
import { Button } from '@/components/atoms/Button'
import { Loader } from '@/components/atoms/Loader'
import { HeroTitle } from '@/components/molecules/HeroTitle'
import { TooltipLayer } from '@/components/molecules/TooltipLayer'
import { SCROLL_LENGTH } from '@/lib/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import type { WaypointRole } from '@/types/watch'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [activeRole, setActiveRole] = useState<WaypointRole | null>(null)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    const scene = new WatchScene(container, { isMobile })
    let cancelled = false
    let ctxCleanup: (() => void) | undefined

    scene.start()

    ;(async () => {
      try {
        await scene.load()
        if (cancelled) return
        setReady(true)

        const ctx = gsap.context(() => {
          createEntranceTimeline({ watch: scene.watch })
          createWaypointTimeline({
            scene,
            trigger: '#scroll-spacer',
            onRoleChange: setActiveRole,
          })
          createHeroFadeOut('#scroll-spacer')

          gsap.from('#cta-inner', {
            y: 70,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#cta',
              start: 'top 65%',
              toggleActions: 'play none none none',
            },
          })
        }, wrapRef)

        ctxCleanup = () => ctx.revert()
      } catch (e) {
        console.error(e)
        if (!cancelled) {
          setError('خطا در بارگذاری مدل سه‌بعدی. لطفاً اتصال خود را بررسی کنید.')
        }
      }
    })()

    return () => {
      cancelled = true
      ctxCleanup?.()
      ScrollTrigger.getAll().forEach(t => t.kill())
      scene.dispose()
    }
  }, [isMobile])

  return (
    <section ref={wrapRef} className="relative">
      <Loader hidden={ready} />

      <div ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />

      <HeroTitle />

      <TooltipLayer activeRole={activeRole} />

      {error && (
        <div className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-lg border border-red-500/30 bg-red-950/60 px-4 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div id="scroll-spacer" style={{ height: SCROLL_LENGTH }} />

      <section
        id="cta"
        className="relative z-10 flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0b0b0e] via-[#070709] to-[#050505] px-6"
      >
        <div id="cta-inner" className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
            <span className="text-white">آماده‌اید </span>
            <span className="gold-gradient-text">زمان</span>
            <span className="text-white"> خود را بسازید</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-sm leading-7 text-white/65 md:text-base">
            برای دریافت مشاوره رایگان یا خرید ساعت مورد نظرتان با ما در تماس باشید.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto">خرید ساعت</Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">مشاوره رایگان</Button>
          </div>
        </div>
      </section>
    </section>
  )
}