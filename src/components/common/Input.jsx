import { forwardRef, useState } from 'react'
import { classNames } from '../../utils/helpers'

// These input types always render their own placeholder-like text
// (e.g. "dd-mm-yyyy") even when "empty", so the label must always sit
// floated above them — it can never safely share the centered position.
const ALWAYS_FLOAT_TYPES = ['date', 'time', 'month', 'week', 'datetime-local']

const Input = forwardRef(function Input(
  { label, error, type = 'text', className = '', icon: Icon, ...rest },
  ref,
) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(!!rest.value || !!rest.defaultValue)
  const floatAlways = ALWAYS_FLOAT_TYPES.includes(type)

  return (
    <div className={classNames('relative', className)}>
      <div
        className={classNames(
          'relative rounded-2xl border bg-white/60 dark:bg-white/5 transition-colors',
          error ? 'border-danger' : focused ? 'border-primary-500' : 'border-slate-200 dark:border-white/10',
        )}
      >
        {Icon && (
          <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <input
          ref={ref}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            setHasValue(!!e.target.value)
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value)
            rest.onChange?.(e)
          }}
          placeholder=" "
          className={classNames(
            'peer w-full bg-transparent outline-none rounded-2xl pt-5 pb-2 text-sm',
            Icon ? 'pl-11 pr-4' : 'px-4',
          )}
          {...rest}
        />
        <label
          className={classNames(
            'absolute pointer-events-none transition-all duration-200',
            Icon ? 'left-11' : 'left-4',
            focused || hasValue || floatAlways
              ? 'top-1.5 text-[11px] font-medium'
              : 'top-1/2 -translate-y-1/2 text-sm',
            focused ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400',
          )}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1.5 text-xs text-danger font-medium">{error}</p>}
    </div>
  )
})

export default Input
