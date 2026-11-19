import { motion } from 'framer-motion'
import { WORKFLOW_STEPS } from '../../data/dummyData'
import FadeIn from '../animations/FadeIn'

export default function Workflow() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-y border-slate-200/70 bg-canvas-soil/55 py-20 dark:border-white/10 dark:bg-moss-900/40 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FadeIn className="mb-12 grid gap-4 md:grid-cols-[0.8fr_1fr] md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">How it works</span>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold tracking-tight sm:text-4xl">A thoughtful way to compare your options</h2>
          </div>
          <p className="max-w-xl leading-7 text-slate-600 dark:text-slate-300 md:justify-self-end">
            Add a few details about your crop. HarvestIQ brings the pieces together into a simple side-by-side view you can use as a starting point.
          </p>
        </FadeIn>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.slice(0, 4).map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 dark:border-white/10 dark:bg-moss-900/60"
            >
              <span className="font-mono-num text-xs font-semibold text-primary-700 dark:text-primary-300">0{i + 1}</span>
              <h3 className="mt-4 font-display font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">Demo only: recommendations are illustrative, not financial or agricultural advice.</p>
      </div>
    </section>
  )
}
