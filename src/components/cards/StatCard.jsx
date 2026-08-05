import { motion } from 'framer-motion'
import { classNames } from '../../utils/helpers'
import AnimatedCounter from '../animations/AnimatedCounter'

export default function StatCard({ icon: Icon, label, value, prefix = '', suffix = '', trend, tone = 'primary', delay = 0 }) {
  const TONE_BG = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    secondary: 'from-secondary-500 to-secondary-600',
    warn: 'from-warn to-amber-600',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="glass-card p-5 flex items-center gap-4"
    >
      <div className={classNames('h-12 w-12 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shrink-0', TONE_BG[tone])}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 truncate">{label}</p>
        <p className="font-display font-bold text-xl">
          {typeof value === 'number' ? <AnimatedCounter value={value} prefix={prefix} suffix={suffix} /> : value}
        </p>
        {trend && <p className={classNames('text-[11px] font-medium', trend.startsWith('-') ? 'text-danger' : 'text-primary-600')}>{trend}</p>}
      </div>
    </motion.div>
  )
}
