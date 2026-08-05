import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sprout, Home } from 'lucide-react'
import Button from '../components/common/Button'

export default function NotFound() {
  return (
    <section className="max-w-2xl mx-auto px-5 py-28 text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center mx-auto mb-8 shadow-glow"
      >
        <motion.div animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.5 }}>
          <Sprout size={44} />
        </motion.div>
      </motion.div>
      <h1 className="font-display font-bold text-6xl mb-3 text-gradient">404</h1>
      <h2 className="font-display font-semibold text-xl mb-3">This field hasn't been planted yet</h2>
      <p className="text-slate-500 mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/">
        <Button icon={Home} size="lg">Back to Home</Button>
      </Link>
    </section>
  )
}
