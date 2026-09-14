import { describe, expect, it } from 'vitest'
import { toPersianDigits } from '@/lib/utils'

describe('toPersianDigits', () => {
  it('Converting Latin numerals to Persian numerals', () => {
    expect(toPersianDigits('123')).toBe('۱۲۳')
    expect(toPersianDigits('Year 2024')).toBe('Year ۲۰۲۴')
  })
})