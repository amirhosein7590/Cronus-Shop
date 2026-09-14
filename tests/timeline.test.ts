import { describe, expect, it } from 'vitest'
import { TIMELINE } from '@/data/timeline'

describe('timeline data', () => {
  it('progress is between 0 and 1', () => {
    TIMELINE.forEach(item => {
      expect(item.progress).toBeGreaterThan(0)
      expect(item.progress).toBeLessThanOrEqual(1)
    })
  })

  it('metric values in negative', () => {
    TIMELINE.forEach(item => {
      expect(item.metric.value).toBeGreaterThanOrEqual(0)
    })
  })
})