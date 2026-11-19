import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/hero/Hero'
import Workflow from '../components/workflow/Workflow'
import Features from '../components/features/Features'
import FadeIn from '../components/animations/FadeIn'
import Button from '../components/common/Button'

export default function Home() {
  return (
    <>
      <Hero />
      <Workflow />
      <Features />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary-800 px-6 py-12 text-white sm:px-10 md:py-16">
            <div className="pointer-events-none absolute -right-16 -top-32 h-80 w-80 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-4 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="relative max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">A more considered sale starts here</span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Bring your next crop into focus.</h2>
              <p className="mt-4 max-w-xl leading-7 text-primary-100">Try the demo to see how prices, travel and harvest conditions can fit together. Sample data only — your local market is the best source for current rates.</p>
              <Link to="/analyzer" className="mt-7 inline-flex">
                <Button size="lg" variant="secondary" icon={ArrowRight} iconPosition="right" className="border-white/30 bg-white text-primary-800 hover:bg-primary-50">Explore the demo</Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
