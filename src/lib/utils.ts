import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const faDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']

export function toPersianDigits(input: number | string): string {
  return String(input).replace(/\d/g, d => faDigits[Number(d)])
}