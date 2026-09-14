import type { Metadata } from 'next'
import Estedad from "next/font/local"
import './globals.css'

const estedad = Estedad({
  src: [
    {
      path: "../../public/fonts/Estedad-Regular.woff2",
      style: "normal",
      weight: "400"
    }
  ],
  display: "swap",
  variable: "--font-estedad"
})

export const metadata: Metadata = {
  title: 'کرونوس | ساعت لوکس',
  description: 'مرجع ساعت‌های لوکس ایرانی',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={estedad.className}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}