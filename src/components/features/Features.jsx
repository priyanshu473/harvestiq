import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { FEATURES } from '../../data/dummyData'
import FadeIn from '../animations/FadeIn'

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8 lg:py-24">
      <FadeIn className="mb-12 max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">Useful at every step</span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">The details that help you decide</h2>
        <p className="mt-4 max-w-xl leading-7 text-slate-600 dark:text-slate-300">Keep the important parts of a sale together, so you can compare your options with less guesswork.</p>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => {
          const Icon = Icons[feature.icon] || Icons.Sparkles
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-slate-200/80 bg-white/75 p-6 transition-colors hover:border-primary-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-primary-700"
            >
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                <Icon size={21} aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{feature.desc}</p>
            </motion.article>
          )
        })}
      </div>
      <p className="mt-5 text-xs text-slate-500 dark:text-slate-400">This preview is powered by sample data; market prices and forecasts are not live.</p>
    </section>
  )
}
