import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IndianRupee, CloudSun, MapPinned, ScanSearch, ArrowRight, Bookmark, Clock } from 'lucide-react'
import StatCard from '../components/cards/StatCard'
import FadeIn from '../components/animations/FadeIn'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import ProfitLineChart from '../components/charts/ProfitLineChart'
import WeatherPieChart from '../components/charts/WeatherPieChart'
import { fetchDashboardStats } from '../services/api'
import { useApp } from '../context/AppContext'
import { DASHBOARD_ACTIVITY } from '../data/dummyData'
import { formatDate } from '../utils/helpers'

const PROFIT_TREND = Array.from({ length: 7 }).map((_, i) => ({ day: `D${i + 1}`, profit: 4000 + Math.round(Math.sin(i) * 1200) + i * 600 }))
const WEATHER_SPLIT = [
  { name: 'Favorable', value: 62 },
  { name: 'Moderate Risk', value: 26 },
  { name: 'High Risk', value: 12 },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const { history, bookmarks } = useApp()

  useEffect(() => {
    fetchDashboardStats().then(setStats)
  }, [])

  return (
    <div className="space-y-8">
      <FadeIn className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">Welcome back, Farmer 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your crops today.</p>
        </div>
        <Link to="/analyzer">
          <Button icon={ScanSearch}>New Analysis</Button>
        </Link>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={ScanSearch} label="Today's Analyses" value={stats?.todayAnalysis ?? 0} tone="primary" delay={0} />
        <StatCard icon={IndianRupee} label="Avg. Profit" value={stats?.avgProfit ?? 0} prefix="₹" tone="secondary" delay={0.05} />
        <StatCard icon={MapPinned} label="Top Mandi" value={stats?.topMandi ?? '—'} tone="accent" delay={0.1} />
        <StatCard icon={CloudSun} label="Weather Alert" value={stats?.weatherAlert ?? '—'} tone="warn" delay={0.15} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <FadeIn className="glass-card p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-lg mb-4">Profit Trend (7 days)</h3>
          <ProfitLineChart data={PROFIT_TREND} />
        </FadeIn>
        <FadeIn delay={0.05} className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Weather Risk Split</h3>
          <WeatherPieChart data={WEATHER_SPLIT} />
        </FadeIn>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <FadeIn className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><Clock size={16} /> Recent Activity</h3>
          <ul className="space-y-3">
            {DASHBOARD_ACTIVITY.map((a) => (
              <li key={a.id} className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100/70 dark:border-white/5">
                <div>
                  <p className="text-sm font-medium">{a.crop} · <span className="text-slate-500 font-normal">{a.action}</span></p>
                  <p className="text-xs text-slate-400">{a.time}</p>
                </div>
                <span className="text-sm font-semibold text-primary-600 font-mono-num">{a.profit}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.05} className="glass-card p-6">
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2"><Bookmark size={16} /> Bookmarks & History</h3>
          {history.length === 0 && bookmarks.length === 0 ? (
            <EmptyState
              icon={Bookmark}
              title="No saved analyses yet"
              description="Run an analysis and bookmark it to see it here."
              actionLabel="Go to Analyzer"
              onAction={() => {}}
            />
          ) : (
            <ul className="space-y-3">
              {history.slice(0, 5).map((h) => (
                <li key={h.id} className="flex items-center justify-between py-2 border-b last:border-0 border-slate-100/70 dark:border-white/5">
                  <div>
                    <p className="text-sm font-medium">{h.crop} · {h.district}</p>
                    <p className="text-xs text-slate-400">{formatDate(h.date)}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary-600 font-mono-num">₹{h.profit.toLocaleString('en-IN')}</span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/history" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 mt-4">
            View all history <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </div>
    </div>
  )
}
