import { motion } from 'framer-motion'

export default function ProgressBar({ value = 0, label }) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs font-medium mb-1.5 text-slate-500">
          <span>{label}</span>
          <span className="font-mono-num">{value}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-slate-200/70 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ ease: 'easeOut', duration: 0.4 }}
        />
      </div>
    </div>
  )
}
