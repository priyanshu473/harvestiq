import { motion } from 'framer-motion'
import { classNames } from '../../utils/helpers'

export default function Card({ children, className = '', hover = true, gradientBorder = false, delay = 0, as = 'div' }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -6 } : undefined}
      className={classNames(
        'glass-card p-6',
        gradientBorder && 'gradient-border',
        className,
      )}
    >
      {children}
    </Comp>
  )
}
