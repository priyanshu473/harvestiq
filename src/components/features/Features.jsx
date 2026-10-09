import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { FEATURES } from '../../data/dummyData'
import FadeIn from '../animations/FadeIn'

export default function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
      <FadeIn className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Capabilities</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl mt-2">Everything you need to sell smarter</h2>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => {
          const Icon = Icons[f.icon] || Icons.Sparkles
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -8 }}
              className="group glass-card p-7 relative overflow-hidden"
            >
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary-500/10 group-hover:scale-150 transition-transform duration-500" />
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center mb-5 shadow-glow"
              >
                <Icon size={22} />
              </motion.div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
