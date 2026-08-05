import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, ScanSearch, FileBarChart2, History, Bookmark, Settings, LogOut, Leaf,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyzer', label: 'Analyzer', icon: ScanSearch },
  { to: '/dashboard', label: 'Reports', icon: FileBarChart2 },
  { to: '/history', label: 'History', icon: History },
  { to: '/history', label: 'Saved', icon: Bookmark },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 border-r border-slate-200/70 dark:border-white/10 glass">
      <div className="px-6 py-6 flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
          <Leaf size={18} />
        </div>
        <span className="font-display font-bold text-lg">HarvestIQ</span>
      </div>
      {user && (
        <div className="px-6 pb-4">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-xs text-slate-500 truncate">{user.email}</p>
        </div>
      )}
      <nav className="flex-1 px-4 space-y-1">
        {ITEMS.map((item, i) => (
          <NavLink
            key={item.label + i}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors relative ${
                isActive
                  ? 'bg-primary-500 text-white shadow-glow'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-white/5'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 pb-6">
        <motion.button
          whileHover={{ x: 3 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-danger hover:bg-danger/10"
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </div>
    </aside>
  )
}
