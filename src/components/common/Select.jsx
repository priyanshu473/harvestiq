import { forwardRef, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { classNames } from '../../utils/helpers'

// Custom-styled dropdown replacing the native <select>.
// Native <select> option lists are rendered by the OS/browser and can't be
// themed (they ignore dark mode), which is why we build our own list here.
const Select = forwardRef(function Select(
  { label, error, options = [], value, onChange, onBlur, className = '', placeholder = 'Select an option', name },
  ref,
) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectOption(opt) {
    onChange?.(opt)
    setOpen(false)
    onBlur?.()
  }

  return (
    <div className={classNames('relative', className)} ref={wrapperRef}>
      <button
        type="button"
        name={name}
        ref={ref}
        onClick={() => setOpen((o) => !o)}
        className={classNames(
          'relative w-full flex items-center justify-between rounded-2xl border bg-white/60 dark:bg-white/5 pt-5 pb-2 pl-4 pr-10 text-left text-sm transition-colors',
          error ? 'border-danger' : open ? 'border-primary-500' : 'border-slate-200 dark:border-white/10',
        )}
      >
        <span className={value ? '' : 'text-slate-400'}>{value || placeholder}</span>
      </button>

      {/* Label always floats — the button always shows text (a value or the
          placeholder), so the label can never safely sit centered over it. */}
      <label
        className={classNames(
          'absolute left-4 top-1.5 text-[11px] font-medium pointer-events-none transition-colors',
          open || value ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400',
        )}
      >
        {label}
      </label>

      <ChevronDown
        size={16}
        className={classNames(
          'absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-transform',
          open && 'rotate-180',
        )}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 mt-2 w-full glass-card p-2 max-h-60 overflow-y-auto"
          >
            {options.length === 0 && (
              <p className="text-xs text-slate-400 px-3 py-2">No options available</p>
            )}
            {options.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => selectOption(opt)}
                className={classNames(
                  'w-full flex items-center justify-between rounded-xl px-3 py-2 text-sm text-left transition-colors',
                  value === opt
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'hover:bg-slate-100 dark:hover:bg-white/10',
                )}
              >
                {opt}
                {value === opt && <Check size={14} className="text-primary-500 shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-1.5 text-xs text-danger font-medium">{error}</p>}
    </div>
  )
})

export default Select
