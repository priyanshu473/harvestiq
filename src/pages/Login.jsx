import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Leaf } from 'lucide-react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = location.state?.from?.pathname || '/dashboard'

  async function onSubmit(data) {
    setSubmitting(true)
    try {
      await login(data.email, data.password)
      showToast('Welcome back!', 'success')
      navigate(redirectTo, { replace: true })
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password.'
      showToast(message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="max-w-md mx-auto px-5 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center shadow-glow">
            <Leaf size={20} />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl">Welcome back</h1>
            <p className="text-sm text-slate-500">Log in to your HarvestIQ account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <Input
            label="Password"
            type="password"
            icon={Lock}
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />
          <Button type="submit" size="lg" icon={LogIn} className="w-full" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log In'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 font-medium hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
