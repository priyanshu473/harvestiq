import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import {
  runAnalysis,
  fetchHistory,
  clearHistoryApi,
  fetchBookmarks,
  toggleBookmarkApi,
} from '../services/api'
import { useAuth } from './AuthContext'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [history, setHistory] = useState([])
  const [bookmarks, setBookmarks] = useState([]) // array of analysisIds
  const [historyLoading, setHistoryLoading] = useState(true)

  const refreshHistory = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      const data = await fetchHistory()
      setHistory(data)
    } catch (err) {
      console.error('Failed to load history from backend:', err)
    } finally {
      setHistoryLoading(false)
    }
  }, [isAuthenticated])

  const refreshBookmarks = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      const ids = await fetchBookmarks()
      setBookmarks(ids)
    } catch (err) {
      console.error('Failed to load bookmarks from backend:', err)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      refreshHistory()
      refreshBookmarks()
    } else {
      // logged out (or never logged in) — clear anything from a previous session
      setHistory([])
      setBookmarks([])
      setResult(null)
      setHistoryLoading(false)
    }
  }, [isAuthenticated, refreshHistory, refreshBookmarks])

  const analyzeCrop = useCallback(async (formData) => {
    setLoading(true)
    setProgress(0)
    setResult(null)

    // Visual progress steps while the real request is in flight — the
    // backend call and this animation run concurrently, then we wait for
    // whichever finishes last so the bar never jumps backwards.
    const steps = [12, 28, 46, 64, 82, 100]
    const animateProgress = (async () => {
      for (const step of steps) {
        await new Promise((r) => setTimeout(r, 320))
        setProgress(step)
      }
    })()

    const [data] = await Promise.all([runAnalysis(formData), animateProgress])

    setResult(data)
    setLoading(false)
    await refreshHistory()
    return data
  }, [refreshHistory])

  const toggleBookmark = useCallback(async (analysisId) => {
    if (!analysisId) return
    const wasBookmarked = bookmarks.includes(analysisId)
    // optimistic update
    setBookmarks((prev) => (wasBookmarked ? prev.filter((id) => id !== analysisId) : [...prev, analysisId]))
    try {
      await toggleBookmarkApi(analysisId)
    } catch (err) {
      console.error('Failed to toggle bookmark:', err)
      // revert on failure
      setBookmarks((prev) => (wasBookmarked ? [...prev, analysisId] : prev.filter((id) => id !== analysisId)))
    }
  }, [bookmarks])

  const clearHistory = useCallback(async () => {
    try {
      await clearHistoryApi()
      setHistory([])
    } catch (err) {
      console.error('Failed to clear history:', err)
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        result, setResult, loading, progress, analyzeCrop,
        history, historyLoading, clearHistory,
        bookmarks, toggleBookmark,
      }}
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
