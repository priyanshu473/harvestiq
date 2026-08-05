import FadeIn from '../components/animations/FadeIn'
import AnalyzerForm from '../components/forms/AnalyzerForm'

export default function Analyzer() {
  return (
    <section className="max-w-4xl mx-auto px-5 lg:px-8 py-16">
      <FadeIn className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Analyzer</span>
        <h1 className="font-display font-bold text-3xl md:text-4xl mt-2">Tell us about your crop</h1>
        <p className="text-slate-500 mt-3 max-w-lg mx-auto">
          We'll cross-check government mandi data, weather and storage costs to find your best sale.
        </p>
      </FadeIn>
      <AnalyzerForm />
    </section>
  )
}
