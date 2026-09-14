'use client'
import { useEffect, useRef } from 'react'
import { ParticleScene } from '@/lib/three/particleScene'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function ParticleBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const count = isMobile ? 300 : 900
    const scene = new ParticleScene(el, count)
    scene.start()
    return () => scene.dispose()
  }, [isMobile])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}