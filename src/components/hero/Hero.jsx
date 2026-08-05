import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, MapPin, CloudSun, ShieldAlert, TrendingUp } from 'lucide-react'
import Button from '../common/Button'
import FadeIn from '../animations/FadeIn'
import AnimatedCounter from '../animations/AnimatedCounter'

const FLOATING_CARDS = [
  { icon: MapPin, label: "Today's Best Mandi", value: 'Azadpur Mandi', tone: 'text-primary-600', pos: 'top-4 -left-6 md:-left-14' },
  { icon: TrendingUp, label: "Today's Price", value: '₹2,340 / qtl', tone: 'text-accent-600', pos: 'top-40 -right-4 md:-right-10' },
  { icon: CloudSun, label: 'Weather', value: '31°C, Clear', tone: 'text-warn', pos: 'bottom-24 -left-4 md:-left-10' },
  { icon: ShieldAlert, label: 'Spoilage Risk', value: 'Low (6%)', tone: 'text-secondary-600', pos: 'bottom-0 right-4 md:right-8' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-28 md:pt-24 md:pb-36">
      {/* animated background blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-300/30 blur-3xl animate-blob -z-10" />
      <div className="absolute top-40 -right-24 h-[26rem] w-[26rem] rounded-full bg-accent-300/25 blur-3xl animate-blob -z-10" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-secondary-300/25 blur-3xl animate-blob -z-10" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-primary-700 dark:text-primary-300 mb-6">
              <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
              Live across 500+ mandis
            </span>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight mb-6">
              AI Powered <span className="text-gradient">Crop Selling</span> Assistant
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-lg mb-8">
              Analyze mandi prices, weather, storage & transportation together — and let AI
              predict the sale that puts the most profit in your hands.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link to="/analyzer">
                <Button size="lg" icon={ArrowRight} iconPosition="right">Analyze Crop</Button>
              </Link>
              <a href="#workflow">
                <Button size="lg" variant="secondary" icon={PlayCircle}>Learn More</Button>
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.32}>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="font-display font-bold text-2xl">
                  <AnimatedCounter value={500} suffix="+" />
                </p>
                <p className="text-xs text-slate-500">Mandis tracked</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl">
                  <AnimatedCounter value={92} suffix="%" />
                </p>
                <p className="text-xs text-slate-500">Prediction accuracy</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl">
                  <AnimatedCounter value={38000} prefix="₹" />
                </p>
                <p className="text-xs text-slate-500">Avg. profit unlocked</p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="relative h-[420px] hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-10 rounded-[2.5rem] bg-gradient-to-br from-primary-500/20 via-secondary-500/10 to-accent-500/20 gradient-border"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-24 rounded-full border border-dashed border-primary-400/40"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-40 w-40 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-600 shadow-glow flex items-center justify-center"
            >
              <TrendingUp size={56} className="text-white" />
            </motion.div>
          </div>

          {FLOATING_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
              className={`absolute glass-card px-4 py-3 w-48 animate-float ${card.pos}`}
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <card.icon size={15} className={card.tone} />
                <span className="text-[11px] font-medium text-slate-500">{card.label}</span>
              </div>
              <p className="font-display font-semibold text-sm">{card.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
