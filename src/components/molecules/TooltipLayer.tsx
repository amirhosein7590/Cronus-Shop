'use client'
import { useEffect, useRef, useState } from 'react'
import { ROLE_TOOLTIPS } from '@/lib/three/cameraPath'
import { Tooltip } from '@/components/atoms/Tooltip'
import { cn } from '@/lib/utils'
import type { WaypointRole } from '@/types/watch'

type ActiveRole = Exclude<WaypointRole, 'intro'>

const ROLE_SIDE: Partial<Record<ActiveRole, 'left' | 'right'>> = {
  case: 'left',
  glass: 'right',
  dial: 'right',
  movement: 'left',
  hands: 'left',
  crown: 'left',
  indices: 'right',
  strapUpper: 'left',
}

// Must match the CSS transition duration on the Tooltip card.
const SWAP_DELAY_MS = 280

interface Props {
  activeRole: WaypointRole | null
}

export function TooltipLayer({ activeRole }: Props) {
  const active: ActiveRole | null =
    activeRole && activeRole !== 'intro' ? (activeRole as ActiveRole) : null

  // `displayed` lags behind `active` so the outgoing card can fade out
  // before its content is replaced.
  const [displayed, setDisplayed] = useState<ActiveRole | null>(null)
  const [visible, setVisible] = useState(false)
  const swapTimeout = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    if (swapTimeout.current !== null) {
      window.clearTimeout(swapTimeout.current)
      swapTimeout.current = null
    }
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }

    if (active === displayed) {
      setVisible(active !== null)
      return
    }

    setVisible(false)
    swapTimeout.current = window.setTimeout(() => {
      setDisplayed(active)
      rafId.current = requestAnimationFrame(() => {
        if (active !== null) setVisible(true)
      })
    }, SWAP_DELAY_MS)

    return () => {
      if (swapTimeout.current !== null) {
        window.clearTimeout(swapTimeout.current)
        swapTimeout.current = null
      }
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [active, displayed])

  const side = displayed ? ROLE_SIDE[displayed] : 'right'
  const data = displayed ? ROLE_TOOLTIPS[displayed] : null

  return (
    <div
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed top-1/2 z-20 -translate-y-1/2',
        side === 'right'
          ? 'right-[2vw] md:right-[3vw]'
          : 'left-[2vw] md:left-[3vw]'
      )}
    >
      {data && (
        <Tooltip
          title={data.title}
          body={data.body}
          visible={visible}
          side={side}
        />
      )}
    </div>
  )
}