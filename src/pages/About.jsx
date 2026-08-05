import { Leaf, Target, Users, Sparkles } from 'lucide-react'
import FadeIn from '../components/animations/FadeIn'
import AnimatedCounter from '../components/animations/AnimatedCounter'

const VALUES = [
  { icon: Target, title: 'Our Mission', desc: 'Put institutional-grade market intelligence directly into the hands of every farmer, free of middlemen guesswork.' },
  { icon: Sparkles, title: 'AI First', desc: 'Every recommendation is backed by models trained on years of mandi, weather and logistics data.' },
  { icon: Users, title: 'Farmer First', desc: 'Designed with real farmers — simple enough for a first-time user, powerful enough for a cooperative.' },
]

export default function About() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pt-20 pb-16 text-center">
        <FadeIn>
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Leaf size={26} />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">Building the future of crop selling</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            HarvestIQ combines live mandi data, weather intelligence and AI prediction so every farmer can sell
            at the right place, at the right time, for the right price.
          </p>
        </FadeIn>
      </section>

      <section className="max-w-6xl mx-auto px-5 lg:px-8 grid sm:grid-cols-3 gap-6 pb-16">
        {VALUES.map((v, i) => (
          <FadeIn key={v.title} delay={i * 0.08} className="glass-card p-7 text-center">
            <div className="h-11 w-11 rounded-2xl bg-primary-50 dark:bg-white/5 text-primary-600 flex items-center justify-center mx-auto mb-4">
              <v.icon size={20} />
            </div>
            <h3 className="font-display font-semibold mb-2">{v.title}</h3>
            <p className="text-sm text-slate-500">{v.desc}</p>
          </FadeIn>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-24">
        <FadeIn className="glass-card p-10 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="font-display font-bold text-3xl text-primary-600"><AnimatedCounter value={500} suffix="+" /></p>
            <p className="text-xs text-slate-500 mt-1">Mandis tracked nationwide</p>
          </div>
          <div>
            <p className="font-display font-bold text-3xl text-primary-600"><AnimatedCounter value={40000} suffix="+" /></p>
            <p className="text-xs text-slate-500 mt-1">Farmers empowered</p>
          </div>
          <div>
            <p className="font-display font-bold text-3xl text-primary-600"><AnimatedCounter value={92} suffix="%" /></p>
            <p className="text-xs text-slate-500 mt-1">Prediction accuracy</p>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
