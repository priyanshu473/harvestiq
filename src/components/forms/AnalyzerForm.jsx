import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Sprout, Scale, MapPin, Calendar, Star, Warehouse, Route, Truck, RotateCcw, Sparkles } from 'lucide-react'
import Input from '../common/Input'
import Select from '../common/Select'
import Button from '../common/Button'
import ProgressBar from '../common/ProgressBar'
import { CROPS, STATES, DISTRICTS_BY_STATE, QUALITY_GRADES } from '../../data/dummyData'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'

export default function AnalyzerForm() {
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      crop: '', quantity: '', district: '', state: '', harvestDate: '',
      quality: '', storageDays: '', distance: '', transportCost: '',
    },
  })
  const { analyzeCrop, loading, progress } = useApp()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const selectedState = watch('state')
  const [districts, setDistricts] = useState([])

  useEffect(() => {
    setDistricts(DISTRICTS_BY_STATE[selectedState] || [])
  }, [selectedState])

  async function onSubmit(data) {
    try {
      await analyzeCrop(data)
      showToast('Analysis complete — recommendation ready!', 'success')
      navigate('/analyzer/result')
    } catch {
      showToast('Something went wrong. Please try again.', 'error')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="glass-card p-6 md:p-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white flex items-center justify-center shadow-glow">
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl">Crop Analyzer</h2>
          <p className="text-sm text-slate-500">Fill in your details for an AI-backed recommendation</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Controller
          name="crop"
          control={control}
          rules={{ required: 'Please select a crop' }}
          render={({ field }) => (
            <Select {...field} label="Crop" options={CROPS} placeholder="Select crop" error={errors.crop?.message} />
          )}
        />
        <Input
          label="Quantity (Quintals)"
          type="number"
          icon={Scale}
          error={errors.quantity?.message}
          {...register('quantity', { required: 'Quantity is required', min: { value: 1, message: 'Must be at least 1' } })}
        />
        <Controller
          name="state"
          control={control}
          rules={{ required: 'Please select a state' }}
          render={({ field }) => (
            <Select {...field} label="State" options={STATES} placeholder="Select state" error={errors.state?.message} />
          )}
        />
        <Controller
          name="district"
          control={control}
          rules={{ required: 'Please select a district' }}
          render={({ field }) => (
            <Select {...field} label="District" options={districts} placeholder="Select district" error={errors.district?.message} />
          )}
        />
        <Input
          label="Expected Harvest Date"
          type="date"
          icon={Calendar}
          error={errors.harvestDate?.message}
          {...register('harvestDate', { required: 'Harvest date is required' })}
        />
        <Controller
          name="quality"
          control={control}
          rules={{ required: 'Please select quality grade' }}
          render={({ field }) => (
            <Select {...field} label="Quality Grade" options={QUALITY_GRADES} placeholder="Select grade" error={errors.quality?.message} />
          )}
        />
        <Input
          label="Storage Days"
          type="number"
          icon={Warehouse}
          error={errors.storageDays?.message}
          {...register('storageDays', { required: 'Storage days required', min: 0 })}
        />
        <Input
          label="Distance to Mandi (km)"
          type="number"
          icon={Route}
          error={errors.distance?.message}
          {...register('distance', { required: 'Distance is required', min: 1 })}
        />
        <Input
          label="Transport Cost (₹/km)"
          type="number"
          icon={Truck}
          className="md:col-span-2"
          error={errors.transportCost?.message}
          {...register('transportCost', { required: 'Transport cost is required', min: 1 })}
        />
      </div>

      {loading && (
        <div className="mt-8">
          <ProgressBar value={progress} label="Running AI analysis…" />
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-8">
        <Button type="submit" size="lg" icon={Sprout} disabled={loading}>
          {loading ? 'Analyzing…' : 'Analyze'}
        </Button>
        <Button type="button" variant="secondary" size="lg" icon={RotateCcw} onClick={() => reset()} disabled={loading}>
          Reset
        </Button>
      </div>
    </motion.form>
  )
}
