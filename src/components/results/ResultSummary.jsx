import { motion } from 'framer-motion'
import { IndianRupee, MapPinned, Gauge, CloudRain, Warehouse, Sparkles } from 'lucide-react'
import AnimatedCounter from '../animations/AnimatedCounter'
import { riskColor } from '../../utils/helpers'

export default function ResultSummary({ summary }) {
  if (!summary) return null
  const cards = [
    { icon: IndianRupee, label: 'Expected Profit', value: <AnimatedCounter value={summary.expectedProfit} prefix="₹" />, tone: 'from-primary-500 to-primary-600' },
    { icon: MapPinned, label: 'Best Mandi', value: summary.bestMandi, tone: 'from-accent-500 to-accent-600' },
    { icon: Gauge, label: 'Confidence', value: <AnimatedCounter value={summary.confidence} suffix="%" />, tone: 'from-secondary-500 to-secondary-600' },
    { icon: CloudRain, label: 'Weather Risk', value: summary.weatherRisk, tone: 'from-warn to-amber-600' },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-border glass-card p-7 md:p-9 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary-500/10" />
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-primary-500" />
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">AI Recommendation</span>
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">{summary.recommendation}</h2>
        <p className="text-sm text-slate-500 flex items-center gap-2">
          <Warehouse size={14} /> {summary.storageAdvice}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5"
          >
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c.tone} text-white flex items-center justify-center mb-3`}>
              <c.icon size={18} />
            </div>
            <p className="text-xs text-slate-500 mb-1">{c.label}</p>
            <p className="font-display font-bold text-lg">{c.value}</p>
          </motion.div>
        ))}
      </div>
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${riskColor(summary.weatherRisk)}`}>
        Spoilage probability: {summary.spoilageProbability}%
      </span>
    </div>
  )
}
