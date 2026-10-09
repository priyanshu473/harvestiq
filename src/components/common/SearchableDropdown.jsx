import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ChevronDown, Check } from 'lucide-react'
import { classNames } from '../../utils/helpers'

export default function SearchableDropdown({ label, options = [], value, onChange, placeholder = 'Search…' }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  )

  return (
    <div className="relative" ref={ref}>
      {label && <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-3 text-sm text-left"
      >
        <span className={value ? '' : 'text-slate-400'}>{value || placeholder}</span>
        <ChevronDown size={16} className={classNames('transition-transform text-slate-400', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 w-full glass-card p-2 max-h-64 overflow-y-auto"
          >
            <div className="flex items-center gap-2 rounded-xl bg-slate-100/70 dark:bg-white/5 px-3 py-2 mb-2">
              <Search size={14} className="text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search…"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
            {filtered.length === 0 && (
              <p className="text-xs text-slate-400 px-3 py-2">No matches found</p>
            )}
            {filtered.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                  setQuery('')
                }}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm text-left hover:bg-primary-50 dark:hover:bg-white/10"
              >
                {opt}
                {value === opt && <Check size={14} className="text-primary-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
