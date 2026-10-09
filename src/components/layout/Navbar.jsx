import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Search, Bell, Menu, X, Leaf, User } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import Button from '../common/Button'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/analyzer', label: 'Analyzer' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/#features', label: 'Features' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-glow">
            <Leaf size={18} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">HarvestIQ</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'text-primary-600 bg-primary-50 dark:bg-white/5' : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-primary-50/70 dark:hover:bg-white/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden md:block relative">
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  placeholder="Search crops, mandis…"
                  className="bg-slate-100/70 dark:bg-white/5 rounded-full px-4 py-2 text-xs outline-none mr-1"
                />
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => setSearchOpen((s) => !s)}
            className="hidden md:flex h-9 w-9 rounded-full items-center justify-center hover:bg-primary-50 dark:hover:bg-white/5 text-slate-500"
          >
            <Search size={18} />
          </button>
          <button className="relative h-9 w-9 rounded-full flex items-center justify-center hover:bg-primary-50 dark:hover:bg-white/5 text-slate-500">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
          </button>
          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-primary-50 dark:hover:bg-white/5 text-slate-500"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button className="hidden sm:flex h-9 w-9 rounded-full bg-primary-500 text-white items-center justify-center">
            <User size={16} />
          </button>
          <Link to="/analyzer" className="hidden lg:block">
            <Button size="sm">Analyze Crop</Button>
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden h-9 w-9 rounded-full flex items-center justify-center text-slate-500"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass overflow-hidden"
          >
            <div className="flex flex-col px-5 py-4 gap-1">
              {LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-50 dark:hover:bg-white/5"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
