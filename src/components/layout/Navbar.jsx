import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Leaf } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import Button from '../common/Button'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/analyzer', label: 'Plan a sale' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/#features', label: 'What you can do', anchor: true },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen])

  const linkClass = ({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary-50 text-primary-800 dark:bg-white/5 dark:text-primary-300'
      : 'text-slate-600 hover:bg-white/70 hover:text-primary-700 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-primary-300'
  }`

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-slate-200/70 bg-canvas/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-moss-950/90' : 'border-transparent bg-canvas/75 backdrop-blur-sm dark:bg-moss-950/75'}`}>
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="HarvestIQ home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-700 text-white">
            <Leaf size={18} aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">HarvestIQ</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {LINKS.map((link) => link.anchor ? (
            <Link key={link.label} to={link.to} className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/70 hover:text-primary-700 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-primary-300">
              {link.label}
            </Link>
          ) : (
            <NavLink key={link.label} to={link.to} end={link.to === '/'} className={linkClass}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-white/80 dark:text-slate-300 dark:hover:bg-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.16 }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <Link to="/analyzer" className="hidden sm:block">
            <Button size="sm">Try the demo</Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-white/80 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200/70 bg-canvas px-5 dark:border-white/10 dark:bg-moss-950 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 py-3">
              {LINKS.map((link) => (
                <Link key={link.label} to={link.to} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-primary-50 dark:text-slate-200 dark:hover:bg-white/5">
                  {link.label}
                </Link>
              ))}
              <Link to="/about" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-primary-50 dark:text-slate-200 dark:hover:bg-white/5">About HarvestIQ</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-primary-50 dark:text-slate-200 dark:hover:bg-white/5">Contact</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
