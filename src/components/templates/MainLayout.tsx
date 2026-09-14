import { Navbar } from '@/components/molecules/Navbar'
import { Footer } from '@/components/molecules/Footer'
import { ProgressBar } from '@/components/atoms/ProgressBar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <main className="relative">{children}</main>
      <Footer />
    </>
  )
}