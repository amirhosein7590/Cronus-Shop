import { MainLayout } from '@/components/templates/MainLayout'
import { AboutHero } from '@/components/organisms/AboutHero'
import { ParticleBackground } from '@/components/organisms/ParticleBackground'
import { GrowthChart } from '@/components/molecules/GrowthChart'
import { Timeline } from '@/components/organisms/Timeline'
import { StatsSection } from '@/components/organisms/StatsSection'

export default function AboutPage() {
  return (
    <MainLayout>
      <ParticleBackground />

      <div className="relative z-10 pt-16">
        <AboutHero />

        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">
            <span className="gold-gradient-text">رشد</span>
            <span className="text-white"> در چند جمله</span>
          </h2>
          <p className="text-sm leading-8 text-white/65 md:text-base">
            از یک ویترین کوچک در بازار ساعت تا بزرگ‌ترین مرجع تخصصی ساعت لوکس ایران، مسیر ما
            بر پایه‌ی اعتماد مشتری، شفافیت در قیمت و ارائه‌ی خدمات پس از فروش واقعی بنا شده است.
          </p>
        </section>

        <GrowthChart />

        <section className="mx-auto max-w-3xl px-6 py-8 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <span className="text-white">مسیر </span>
            <span className="gold-gradient-text">ما</span>
          </h2>
          <p className="text-sm leading-8 text-white/60">
            هر مرحله، حاصل تصمیم‌های کوچک اما پیوسته است. این تایم‌لاین خلاصه‌ای از نقاط عطف
            کسب‌وکار در نوزده سال گذشته است.
          </p>
        </section>

        <Timeline />
        <StatsSection />

        <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="text-2xl font-bold leading-relaxed md:text-4xl">
            <span className="text-white">مسیر ادامه دارد و این </span>
            <span className="gold-gradient-text">شما هستید</span>
            <span className="text-white"> که آن را می‌سازید</span>
          </h2>
          <p className="mt-6 text-sm leading-8 text-white/60">
            از همراهی‌تان در تمام این سال‌ها سپاسگزاریم.
          </p>
        </section>
      </div>
    </MainLayout>
  )
}