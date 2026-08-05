import { useState } from 'react'
import { motion } from 'framer-motion'
import { classNames } from '../../utils/helpers'

const VARIANTS = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-glow',
  secondary: 'bg-white/70 dark:bg-white/5 border border-primary-500/30 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-white/10',
  accent: 'bg-accent-500 hover:bg-accent-600 text-white',
  ghost: 'bg-transparent hover:bg-primary-50 dark:hover:bg-white/5 text-current',
  danger: 'bg-danger hover:bg-red-600 text-white',
}

const SIZES = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...rest
}) {
  const [ripples, setRipples] = useState([])

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const id = Date.now()
    setRipples((r) => [...r, { id, x, y, size }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650)
    onClick?.(e)
  }

  return (
    <motion.button
      whileHover={{ y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={classNames(
        'btn-ripple relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple-el"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </motion.button>
  )
}
