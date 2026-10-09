import { motion } from 'framer-motion'
import { WORKFLOW_STEPS } from '../../data/dummyData'
import FadeIn from '../animations/FadeIn'

export default function Workflow() {
  return (
    <section id="workflow" className="max-w-5xl mx-auto px-5 lg:px-8 py-24">
      <FadeIn className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">How it works</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl mt-2">From field to best mandi</h2>
        <p className="text-slate-500 mt-3 max-w-xl mx-auto">
          Every analysis moves through the same transparent pipeline — real data in, a ranked decision out.
        </p>
      </FadeIn>

      <div className="relative pl-10">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500" />
        {WORKFLOW_STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="relative mb-10 last:mb-0"
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 + 0.1, type: 'spring', stiffness: 260, damping: 18 }}
              className="absolute -left-10 top-0 h-8 w-8 rounded-full bg-white dark:bg-moss-900 border-2 border-primary-500 flex items-center justify-center text-[11px] font-bold text-primary-600 font-mono-num"
            >
              {i + 1}
            </motion.span>
            <div className="glass-card px-6 py-4">
              <h3 className="font-display font-semibold">{step.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
