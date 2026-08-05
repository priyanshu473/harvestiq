import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = 'Once you have data, it will show up here.',
  actionLabel,
  onAction,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      <div className="h-16 w-16 rounded-2xl bg-primary-50 dark:bg-white/5 flex items-center justify-center mb-4">
        <Icon size={28} className="text-primary-500" />
      </div>
      <h3 className="font-display font-semibold text-lg mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-5">{description}</p>
      {actionLabel && <Button onClick={onAction} size="sm">{actionLabel}</Button>}
    </motion.div>
  )
}
