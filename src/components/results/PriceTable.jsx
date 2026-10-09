import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { formatINR, classNames } from '../../utils/helpers'

export default function PriceTable({ options = [] }) {
  return (
    <div className="glass-card p-6 overflow-x-auto">
      <h3 className="font-display font-semibold text-lg mb-4">Mandi Comparison</h3>
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="text-left text-xs text-slate-500 uppercase tracking-wide border-b border-slate-200/70 dark:border-white/10">
            <th className="py-3 px-3">Rank</th>
            <th className="py-3 px-3">Mandi</th>
            <th className="py-3 px-3">Distance</th>
            <th className="py-3 px-3">Price</th>
            <th className="py-3 px-3">Transport Cost</th>
            <th className="py-3 px-3">Net Profit</th>
            <th className="py-3 px-3">Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {options.map((row, i) => (
            <motion.tr
              key={row.mandi}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={classNames(
                'border-b border-slate-100/70 dark:border-white/5',
                row.recommended && 'bg-primary-50/70 dark:bg-primary-900/20',
              )}
            >
              <td className="py-3 px-3 font-mono-num">{row.rank}</td>
              <td className="py-3 px-3 font-medium">{row.mandi}</td>
              <td className="py-3 px-3 font-mono-num">{row.distance} km</td>
              <td className="py-3 px-3 font-mono-num">{formatINR(row.price)}</td>
              <td className="py-3 px-3 font-mono-num">{formatINR(row.transportCost)}</td>
              <td className="py-3 px-3 font-mono-num font-semibold text-primary-600">{formatINR(row.netProfit)}</td>
              <td className="py-3 px-3">
                {row.recommended ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 dark:text-primary-300">
                    <Trophy size={13} /> Best Choice
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">—</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
