import { Link } from 'react-router-dom'
import { Leaf, Github, Linkedin, Twitter } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '/about' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Analyzer', to: '/analyzer' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'History', to: '/history' },
    ],
  },
  {
    title: 'Government Links',
    links: [
      { label: 'Agmarknet', to: '/about' },
      { label: 'eNAM', to: '/about' },
      { label: 'IMD Weather', to: '/about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/about' },
      { label: 'Terms of Service', to: '/about' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-slate-200/70 dark:border-white/10 bg-canvas-soil/60 dark:bg-moss-900/60">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
              <Leaf size={18} />
            </div>
            <span className="font-display font-bold text-lg">HarvestIQ</span>
          </div>
          <p className="text-sm text-slate-500 max-w-xs">
            AI-powered crop selling intelligence — mandi prices, weather and storage insight in one place.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full glass flex items-center justify-center text-slate-500 hover:text-primary-600 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-sm mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-500 hover:text-primary-600 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200/70 dark:border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} HarvestIQ. Built for the farmers who feed us.
      </div>
    </footer>
  )
}
