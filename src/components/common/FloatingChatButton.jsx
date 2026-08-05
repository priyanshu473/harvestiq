import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Leaf } from 'lucide-react'

export default function FloatingChatButton() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Namaste! I\'m Iggy, your HarvestIQ assistant. Ask me about mandi prices, weather, or storage tips.' },
  ])
  const [input, setInput] = useState('')

  function send() {
    if (!input.trim()) return
    setMessages((m) => [...m, { from: 'user', text: input }])
    const reply = 'This is a demo assistant — connect a live API to get real answers about your crop.'
    setInput('')
    setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: reply }]), 500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card w-80 h-96 mb-4 flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/20 dark:border-white/10">
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <Leaf size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold">Iggy</p>
                <p className="text-[11px] text-primary-600 dark:text-primary-400">Online</p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'user' ? 'text-right' : 'text-left'}>
                  <span
                    className={
                      m.from === 'user'
                        ? 'inline-block bg-primary-500 text-white rounded-2xl rounded-br-sm px-3 py-2 text-xs max-w-[85%]'
                        : 'inline-block bg-slate-100 dark:bg-white/10 rounded-2xl rounded-bl-sm px-3 py-2 text-xs max-w-[85%]'
                    }
                  >
                    {m.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-3 border-t border-white/20 dark:border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask something…"
                className="flex-1 bg-slate-100/70 dark:bg-white/5 rounded-full px-4 py-2 text-xs outline-none"
              />
              <button onClick={send} className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center shrink-0">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-glow flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? 'x' : 'c'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            {open ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
