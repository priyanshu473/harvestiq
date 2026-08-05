import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import FadeIn from '../components/animations/FadeIn'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useToast } from '../context/ToastContext'
import { submitContact } from '../services/api'

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'support@harvestiq.app' },
  { icon: Phone, label: 'Phone', value: '+91 1800-200-3000' },
  { icon: MapPin, label: 'Office', value: 'Agri Tech Park, Sector 62, Noida' },
]

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { showToast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(data) {
    setSubmitting(true)
    try {
      await submitContact(data)
      showToast('Message sent — we\'ll get back to you soon!', 'success')
      reset()
    } catch (err) {
      showToast('Could not send your message — please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-5 lg:px-8 py-20 grid lg:grid-cols-5 gap-10">
      <FadeIn className="lg:col-span-2 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">Get in touch</span>
          <h1 className="font-display font-bold text-3xl mt-2 mb-3">We'd love to hear from you</h1>
          <p className="text-slate-500 text-sm">
            Questions, feedback, or partnership ideas — our team typically replies within one business day.
          </p>
        </div>
        {CONTACT_INFO.map((c) => (
          <div key={c.label} className="flex items-center gap-4 glass-card p-4">
            <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-white/5 text-primary-600 flex items-center justify-center shrink-0">
              <c.icon size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{c.label}</p>
              <p className="text-sm font-medium">{c.value}</p>
            </div>
          </div>
        ))}
      </FadeIn>

      <FadeIn delay={0.1} className="lg:col-span-3 glass-card p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input label="Full Name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
            <Input label="Email Address" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
          </div>
          <Input label="Subject" error={errors.subject?.message} {...register('subject', { required: 'Subject is required' })} />
          <div className="relative">
            <textarea
              rows={5}
              placeholder=" "
              className="peer w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 outline-none px-4 pt-5 pb-2 text-sm focus:border-primary-500"
              {...register('message', { required: true })}
            />
            <label className="absolute left-4 top-1.5 text-[11px] font-medium text-primary-600 dark:text-primary-400">Message</label>
          </div>
          <Button type="submit" size="lg" icon={Send} iconPosition="right" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send Message'}
          </Button>
        </form>
      </FadeIn>
    </section>
  )
}
