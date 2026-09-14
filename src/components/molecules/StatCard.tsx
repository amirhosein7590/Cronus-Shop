import { StatNumber } from '@/components/atoms/StatNumber'

interface Props {
  label: string
  value: number
  suffix?: string
}

export function StatCard({ label, value, suffix }: Props) {
  return (
    <div className="glass rounded-2xl p-6 text-center transition-transform duration-500 hover:-translate-y-1">
      <div className="text-3xl font-bold gold-gradient-text md:text-4xl">
        <StatNumber value={value} suffix={suffix} />
      </div>
      <p className="mt-2 text-sm text-white/60">{label}</p>
    </div>
  )
}