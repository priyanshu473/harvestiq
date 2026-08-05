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

      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-24">
        <FadeIn>
          <div className="gradient-border glass-card p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-topo opacity-60" />
            <div className="relative">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
                Ready to sell at the right price?
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto mb-8">
                Run your first AI analysis in under a minute — no signup required for this demo.
              </p>
              <Link to="/analyzer">
                <Button size="lg" icon={ArrowRight} iconPosition="right">Analyze Your Crop</Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
