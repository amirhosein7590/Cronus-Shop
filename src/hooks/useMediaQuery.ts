'use client'
import { useEffect, useState } from 'react'

export function useMediaQuery(query: string, fallback = false) {
  const [match, setMatch] = useState(fallback)
  useEffect(() => {
    const m = window.matchMedia(query)
    const onChange = () => setMatch(m.matches)
    onChange()
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [query])
  return match
}