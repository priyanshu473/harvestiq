import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, CloudSun, ShieldCheck, TrendingUp } from 'lucide-react'
import Button from '../common/Button'
import FadeIn from '../animations/FadeIn'

const SNAPSHOTS = [
  { icon: MapPin, label: 'Suggested market', value: 'Azadpur Mandi', tone: 'text-primary-700' },
  { icon: TrendingUp, label: 'Indicative price', value: '₹2,340 / qtl', tone: 'text-amber-700' },
  { icon: CloudSun, label: 'Weather outlook', value: 'Clear skies', tone: 'text-sky-700' },
  { icon: ShieldCheck, label: 'Holding risk', value: 'Low', tone: 'text-primary-700' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-12 sm:pt-16 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div>
          <FadeIn>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-3.5 py-2 text-xs font-semibold text-primary-800 shadow-sm dark:border-primary-800 dark:bg-moss-900/70 dark:text-primary-200">
              <span className="h-2 w-2 rounded-full bg-primary-500" />
              A simple planning tool for Indian farmers
            </span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mb-6 max-w-2xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Your hard work deserves a <span className="font-editorial text-primary-700 dark:text-primary-300">better sale.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mb-8 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg md:leading-8">
              Compare market prices, travel costs and the weather around your harvest. Get a clear, practical place to start — without the jargon.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mb-9 flex flex-wrap items-center gap-3">
              <Link to="/analyzer">
                <Button size="lg" icon={ArrowRight} iconPosition="right">Plan a sale</Button>
              </Link>
              <a href="#how-it-works" className="rounded-full px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-white/70 dark:text-slate-200 dark:hover:bg-white/5">
                See how it works
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="flex items-start gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              Preview uses sample data. Check local mandi rates before making a sale decision.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.18}>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="field-illustration relative min-h-[300px] overflow-hidden rounded-[2rem] border border-white/60 shadow-xl shadow-primary-950/10 sm:min-h-[380px]" role="img" aria-label="Illustration of fields at sunrise">
              <div className="field-sun" />
              <div className="field-hill field-hill-back" />
              <div className="field-hill field-hill-front" />
              <div className="field-row field-row-one" />
              <div className="field-row field-row-two" />
              <div className="field-row field-row-three" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white sm:p-7">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">A little more certainty</span>
                  <p className="mt-1 font-editorial text-2xl sm:text-3xl">From your field to market</p>
                </div>
                <span className="rounded-full border border-white/30 bg-black/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">HarvestIQ preview</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="relative mt-4 grid grid-cols-2 gap-3 sm:absolute sm:-bottom-8 sm:-left-7 sm:mt-0 sm:w-[78%] sm:rounded-2xl sm:border sm:border-white/70 sm:bg-white/95 sm:p-4 sm:shadow-xl sm:shadow-slate-900/10 sm:backdrop-blur dark:sm:border-white/10 dark:sm:bg-moss-900/95"
            >
              {SNAPSHOTS.map(({ icon: Icon, label, value, tone }) => (
                <div key={label} className="rounded-2xl border border-white/70 bg-white/85 p-3 shadow-sm dark:border-white/10 dark:bg-moss-900/80 sm:border-0 sm:bg-transparent sm:p-2 sm:shadow-none dark:sm:bg-transparent">
                  <div className="mb-1.5 flex items-center gap-2">
                    <Icon size={14} className={tone} aria-hidden="true" />
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{label}</span>
                  </div>
                  <p className="font-display text-sm font-semibold">{value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
