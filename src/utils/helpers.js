export function formatINR(value) {
  if (value === undefined || value === null || Number.isNaN(value)) return '₹0'
  return '₹' + Number(value).toLocaleString('en-IN')
}

export function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function classNames(...args) {
  return args.filter(Boolean).join(' ')
}

export function riskColor(risk) {
  switch (risk) {
    case 'Low': return 'text-primary-600 bg-primary-100 dark:bg-primary-900/40 dark:text-primary-300'
    case 'Medium': return 'text-warn bg-warn/10'
    case 'High': return 'text-danger bg-danger/10'
    default: return 'text-slate-500 bg-slate-100'
  }
}
