import { createContext, useContext, useState, useCallback } from 'react'
import { runAnalysis } from '../services/api'

const AppContext = createContext(null)

const HISTORY_KEY = 'harvestiq-history'
const BOOKMARK_KEY = 'harvestiq-bookmarks'

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [history, setHistory] = useState(() => loadJSON(HISTORY_KEY, []))
  const [bookmarks, setBookmarks] = useState(() => loadJSON(BOOKMARK_KEY, []))

  const analyzeCrop = useCallback(async (formData) => {
    setLoading(true)
    setProgress(0)
    setResult(null)

    const steps = [12, 28, 46, 64, 82, 100]
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 320))
      setProgress(step)
    }

    const data = await runAnalysis(formData)
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      crop: formData.crop,
      district: formData.district,
      state: formData.state,
      profit: data.summary.expectedProfit,
      bestMandi: data.summary.bestMandi,
      confidence: data.summary.confidence,
    }
    const newHistory = [entry, ...history].slice(0, 25)
    setHistory(newHistory)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))

    setResult(data)
    setLoading(false)
    return data
  }, [history])

  const toggleBookmark = useCallback((crop) => {
    setBookmarks((prev) => {
      const exists = prev.includes(crop)
      const next = exists ? prev.filter((c) => c !== crop) : [...prev, crop]
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }, [])

  return (
    <AppContext.Provider
      value={{ result, setResult, loading, progress, analyzeCrop, history, clearHistory, bookmarks, toggleBookmark }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
