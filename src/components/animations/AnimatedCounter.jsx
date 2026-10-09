import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'

export default function AnimatedCounter({ value, prefix = '', suffix = '', className = '' }) {
  const [ref, inView] = useInView()
  const count = useCountUp(value, 1400, inView)
  return (
    <span ref={ref} className={`font-mono-num tabular-nums ${className}`}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}
