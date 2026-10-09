import { useState } from 'react'
import { Sun, Moon, Bell, Globe, ShieldCheck, User, Save } from 'lucide-react'
import FadeIn from '../components/animations/FadeIn'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked ? 'bg-primary-500' : 'bg-slate-300 dark:bg-white/10'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()
  const [notifs, setNotifs] = useState({ price: true, weather: true, weekly: false })
  const [name, setName] = useState('Farmer Singh')
  const [phone, setPhone] = useState('+91 98765 43210')

  return (
    <div className="max-w-3xl space-y-8">
      <FadeIn>
        <h1 className="font-display font-bold text-2xl md:text-3xl">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account, appearance and notification preferences.</p>
      </FadeIn>

      <FadeIn className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg mb-5 flex items-center gap-2"><User size={18} /> Profile</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </FadeIn>

      <FadeIn delay={0.05} className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
          {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />} Appearance
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Dark Mode</p>
            <p className="text-xs text-slate-500">Switch between light and dark themes</p>
          </div>
          <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </FadeIn>

      <FadeIn delay={0.1} className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg mb-5 flex items-center gap-2"><Bell size={18} /> Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'price', label: 'Price Alerts', desc: 'Get notified when your saved crop price changes' },
            { key: 'weather', label: 'Weather Warnings', desc: 'Alerts for high-risk weather in your district' },
            { key: 'weekly', label: 'Weekly Summary', desc: 'A digest of trends every Monday morning' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <Toggle checked={notifs[item.key]} onChange={(v) => setNotifs((n) => ({ ...n, [item.key]: v }))} />
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15} className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg mb-5 flex items-center gap-2"><Globe size={18} /> Language & Region</h3>
        <div className="flex flex-wrap gap-2">
          {['English', 'हिंदी', 'ਪੰਜਾਬੀ', 'मराठी', 'ગુજરાતી'].map((lang) => (
            <span key={lang} className="px-4 py-2 rounded-full text-sm bg-slate-100/70 dark:bg-white/5 cursor-pointer hover:bg-primary-50 dark:hover:bg-white/10">
              {lang}
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="glass-card p-6 flex items-center gap-3">
        <ShieldCheck size={18} className="text-primary-500" />
        <p className="text-sm text-slate-500">Your data stays on this device — HarvestIQ demo does not use a backend.</p>
      </FadeIn>

      <Button icon={Save} onClick={() => showToast('Settings saved', 'success')}>Save Changes</Button>
    </div>
  )
}
