'use client'

export function HeroTitle() {
  const words = ['زمان', 'را', 'لمس', 'کنید']

  return (
    <div
      className={[
        'hero-copy pointer-events-none fixed z-20 flex flex-col',
        'inset-x-0 top-[14vh] items-center px-6 text-center',
        'md:inset-x-auto md:right-[5vw] md:top-0 md:bottom-0 md:w-[min(36vw,420px)]',
        'md:items-end md:justify-center md:px-0 md:text-right',
      ].join(' ')}
    >
      <h1 className="text-balance text-4xl font-bold leading-[1.25] tracking-tight md:text-5xl xl:text-6xl">
        {words.map((w, i) => (
          <span
            key={i}
            className="hero-word mx-1 inline-block opacity-0"
            style={{ filter: 'blur(20px)', transform: 'translateY(40px)' }}
          >
            <span className={i === words.length - 1 ? 'gold-gradient-text' : 'text-white'}>
              {w}
            </span>
          </span>
        ))}
      </h1>
      <p
        className="hero-sub mt-6 max-w-md text-sm leading-7 text-white/60 opacity-0 md:text-base"
        style={{ transform: 'translateY(20px)' }}
      >
        مجموعه‌ای منتخب از ساعت‌های لوکس سوئیسی با ضمانت اصالت و خدمات پس از فروش مادام‌العمر.
      </p>
    </div>
  )
}