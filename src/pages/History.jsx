import { Trash2, History as HistoryIcon, MapPin, TrendingUp } from 'lucide-react'
import FadeIn from '../components/animations/FadeIn'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import Badge from '../components/common/Badge'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import { formatDate, formatINR } from '../utils/helpers'
import { Link } from 'react-router-dom'

export default function History() {
  const { history, clearHistory, bookmarks } = useApp()
  const { showToast } = useToast()

  return (
    <div className="space-y-8">
      <FadeIn className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">Analysis History</h1>
          <p className="text-slate-500 text-sm mt-1">Every crop you've analyzed, saved locally on this device.</p>
        </div>
        {history.length > 0 && (
          <Button
            variant="secondary"
            icon={Trash2}
            onClick={() => { clearHistory(); showToast('History cleared', 'info') }}
          >
            Clear History
          </Button>
        )}
      </FadeIn>

      {history.length === 0 ? (
        <div className="glass-card">
          <EmptyState
            icon={HistoryIcon}
            title="No analyses yet"
            description="Run your first crop analysis and it will show up here automatically."
            actionLabel="Go to Analyzer"
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {history.map((h, i) => (
            <FadeIn key={h.id} delay={i * 0.03} className="glass-card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold">{h.crop}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {h.district}, {h.state}
                  </p>
                </div>
                {bookmarks.includes(h.bestMandi) && <Badge tone="primary">Saved</Badge>}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">{formatDate(h.date)}</span>
                <span className="font-mono-num font-semibold text-primary-600 flex items-center gap-1">
                  <TrendingUp size={14} /> {formatINR(h.profit)}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100/70 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
                <span>Best mandi: <strong className="text-ink dark:text-canvas">{h.bestMandi}</strong></span>
                <span>Confidence: {h.confidence}%</span>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      <FadeIn className="text-center pt-4">
        <Link to="/analyzer" className="text-sm font-medium text-primary-600 hover:underline">
          Run a new analysis →
        </Link>
      </FadeIn>
    </div>
  )
}
