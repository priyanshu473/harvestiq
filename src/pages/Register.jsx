import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, UserPlus, Leaf } from 'lucide-react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { register: registerAccount } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const password = watch('password')

  async function onSubmit(data) {
    setSubmitting(true)
    try {
      await registerAccount(data.name, data.email, data.phone, data.password)
      showToast('Account created — welcome to HarvestIQ!', 'success')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const message = err.response?.data?.message || 'Could not create your account.'
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
            <h1 className="font-display font-bold text-xl">Create your account</h1>
            <p className="text-sm text-slate-500">Start analyzing your crops in minutes</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Full Name"
            icon={User}
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <Input
            label="Phone Number"
            icon={Phone}
            error={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            label="Password"
            type="password"
            icon={Lock}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Must be at least 8 characters' },
            })}
          />
          <Input
            label="Confirm Password"
            type="password"
            icon={Lock}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          <Button type="submit" size="lg" icon={UserPlus} className="w-full" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </section>
  )
}
