import { Link, Navigate } from 'react-router-dom'
import { Download, FileSpreadsheet, Share2, ArrowLeft, Bookmark } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import ResultSummary from '../components/results/ResultSummary'
import PriceTable from '../components/results/PriceTable'
import AIRecommendation from '../components/results/AIRecommendation'
import PriceBarChart from '../components/charts/PriceBarChart'
import ProfitLineChart from '../components/charts/ProfitLineChart'
import StorageAreaChart from '../components/charts/StorageAreaChart'
import WeatherPieChart from '../components/charts/WeatherPieChart'
import FadeIn from '../components/animations/FadeIn'
import Button from '../components/common/Button'
import { SkeletonCard } from '../components/common/Skeleton'

export default function AnalyzerResult() {
  const { result, loading, bookmarks, toggleBookmark } = useApp()
  const { showToast } = useToast()

  if (!result && !loading) {
    return <Navigate to="/analyzer" replace />
  }

  if (loading || !result) {
    return (
      <section className="max-w-6xl mx-auto px-5 lg:px-8 py-16 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </section>
    )
  }

  const isBookmarked = bookmarks.includes(result.analysisId)

  return (
    <section className="max-w-6xl mx-auto px-5 lg:px-8 py-16 space-y-10">
      <FadeIn className="flex flex-wrap items-center justify-between gap-4">
        <Link to="/analyzer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-600">
          <ArrowLeft size={16} /> New analysis
        </Link>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant="secondary" icon={Bookmark} onClick={() => { toggleBookmark(result.analysisId); showToast(isBookmarked ? 'Removed bookmark' : 'Saved to bookmarks', 'success') }}>
            {isBookmarked ? 'Saved' : 'Save'}
          </Button>
          <Button size="sm" variant="secondary" icon={Download} onClick={() => showToast('Exported as PDF (demo)', 'info')}>Export PDF</Button>
          <Button size="sm" variant="secondary" icon={FileSpreadsheet} onClick={() => showToast('Exported as Excel (demo)', 'info')}>Export Excel</Button>
          <Button size="sm" variant="ghost" icon={Share2} onClick={() => showToast('Link copied to clipboard (demo)', 'info')}>Share</Button>
        </div>
      </FadeIn>

      <ResultSummary summary={result.summary} />

      <div className="grid lg:grid-cols-2 gap-6">
        <FadeIn className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Price Comparison</h3>
          <PriceBarChart data={result.charts.priceComparison} />
        </FadeIn>
        <FadeIn delay={0.05} className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Profit Comparison</h3>
          <ProfitLineChart data={result.charts.profitTrend} />
        </FadeIn>
        <FadeIn delay={0.1} className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Storage Cost</h3>
          <StorageAreaChart data={result.charts.storageCost} />
        </FadeIn>
        <FadeIn delay={0.15} className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Weather Impact</h3>
          <WeatherPieChart data={result.charts.weatherImpact} />
        </FadeIn>
      </div>

      <FadeIn>
        <PriceTable options={result.mandiOptions} />
      </FadeIn>

      <FadeIn>
        <AIRecommendation ai={result.ai} />
      </FadeIn>
    </section>
  )
}
