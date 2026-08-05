import { classNames } from '../../utils/helpers'

const TONES = {
  primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  accent: 'bg-accent-100 text-accent-600 dark:bg-accent-500/20 dark:text-accent-500',
  warn: 'bg-warn/15 text-warn',
  danger: 'bg-danger/10 text-danger',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
}

export default function Badge({ children, tone = 'primary', icon: Icon, pulse = false, className = '' }) {
  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        TONES[tone],
        className,
      )}
    >
      {pulse && <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
      </span>}
      {Icon && <Icon size={13} />}
      {children}
    </span>
  )
}
