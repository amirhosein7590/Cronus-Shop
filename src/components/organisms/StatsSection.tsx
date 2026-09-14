import { STATS } from '@/data/stats'
import { StatCard } from '@/components/molecules/StatCard'

export function StatsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {STATS.map(s => (
          <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
        ))}
      </div>
    </section>
  )
}