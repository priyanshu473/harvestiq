import { motion } from 'framer-motion'
import { BrainCircuit, CheckCircle2, AlertTriangle, IndianRupee, Warehouse, Truck, CloudSun } from 'lucide-react'
import { formatINR } from '../../utils/helpers'

export default function AIRecommendation({ ai }) {
  if (!ai) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="gradient-border glass-card p-7 md:p-9"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-accent-500 to-primary-500 text-white flex items-center justify-center shadow-glow">
          <BrainCircuit size={20} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">AI Decision</p>
          <h3 className="font-display font-bold text-xl">{ai.decision}</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5"><CheckCircle2 size={14} className="text-primary-500" /> Benefits</p>
          <ul className="space-y-2">
            {ai.benefits.map((b) => (
              <li key={b} className="text-sm flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5"><AlertTriangle size={14} className="text-warn" /> Risks</p>
          <ul className="space-y-2">
            {ai.risks.map((r) => (
              <li key={r} className="text-sm flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warn shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: IndianRupee, label: 'Expected Income', value: formatINR(ai.expectedIncome) },
          { icon: Warehouse, label: 'Storage Suggestion', value: ai.storageSuggestion },
          { icon: Truck, label: 'Transport Suggestion', value: ai.transportSuggestion },
          { icon: CloudSun, label: 'Weather Summary', value: ai.weatherSummary },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white/50 dark:bg-white/5 p-4">
            <item.icon size={16} className="text-primary-500 mb-2" />
            <p className="text-[11px] text-slate-500 mb-1">{item.label}</p>
            <p className="text-xs font-medium leading-snug">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
