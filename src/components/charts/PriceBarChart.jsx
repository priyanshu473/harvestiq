import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'

export default function PriceBarChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.2)" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
          formatter={(v) => [`₹${v}`, 'Price']}
        />
        <Bar dataKey="price" radius={[8, 8, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={i === 0 ? '#16A34A' : '#a7d9b8'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
