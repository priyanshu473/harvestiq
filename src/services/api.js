import { MANDI_NAMES, WEATHER_CONDITIONS } from '../data/dummyData'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) || 1
}

export async function fetchMandiPrices(crop) {
  await delay(400)
  const rnd = seededRandom(hashString(crop || 'default'))
  const base = 1800 + Math.floor(rnd() * 2200)
  return MANDI_NAMES.map((name, i) => ({
    mandi: name,
    price: base + Math.floor(rnd() * 600) - i * 15,
  }))
}

export async function fetchWeather(district) {
  await delay(350)
  const rnd = seededRandom(hashString(district || 'default'))
  const condition = WEATHER_CONDITIONS[Math.floor(rnd() * WEATHER_CONDITIONS.length)]
  return {
    condition: condition.label,
    risk: condition.risk,
    temp: 24 + Math.floor(rnd() * 14),
    humidity: 40 + Math.floor(rnd() * 45),
  }
}

export async function runAnalysis(formData) {
  await delay(500)
  const seedKey = `${formData.crop}-${formData.district}-${formData.state}`
  const rnd = seededRandom(hashString(seedKey))

  const basePrice = 1800 + Math.floor(rnd() * 2400)
  const qty = Number(formData.quantity) || 10

  const mandiOptions = MANDI_NAMES.slice(0, 6).map((name, i) => {
    const price = basePrice + Math.floor(rnd() * 500) - i * 40
    const distance = 15 + Math.floor(rnd() * 220)
    const transportCost = Math.round(distance * (Number(formData.transportCost) || 12))
    const grossRevenue = price * qty
    const netProfit = grossRevenue - transportCost - (Number(formData.storageDays) || 0) * 25 * qty / 100
    return {
      mandi: name,
      distance,
      price,
      transportCost,
      netProfit: Math.round(netProfit),
    }
  }).sort((a, b) => b.netProfit - a.netProfit)
    .map((m, idx) => ({ ...m, rank: idx + 1, recommended: idx === 0 }))

  const best = mandiOptions[0]

  const weather = WEATHER_CONDITIONS[Math.floor(rnd() * WEATHER_CONDITIONS.length)]

  const priceComparison = mandiOptions.map((m) => ({ name: m.mandi.split(' ')[0], price: m.price }))
  const profitTrend = Array.from({ length: 6 }).map((_, i) => ({
    day: `Day ${i + 1}`,
    profit: Math.round(best.netProfit * (0.7 + rnd() * 0.5) * (1 + i * 0.03)),
  }))
  const storageCost = Array.from({ length: 5 }).map((_, i) => ({
    day: `D${i + 1}`,
    cost: Math.round(15 + rnd() * 20 + i * 4),
  }))
  const weatherImpact = [
    { name: 'Favorable', value: 55 + Math.floor(rnd() * 20) },
    { name: 'Moderate Risk', value: 20 + Math.floor(rnd() * 10) },
    { name: 'High Risk', value: 8 + Math.floor(rnd() * 10) },
  ]

  const confidence = 78 + Math.floor(rnd() * 18)
  const spoilage = Math.max(2, Math.round((100 - confidence) * 0.6))

  return {
    summary: {
      expectedProfit: best.netProfit,
      bestMandi: best.mandi,
      confidence,
      weatherRisk: weather.risk,
      spoilageProbability: spoilage,
      storageAdvice: (formData.storageDays > 5)
        ? 'Consider selling sooner — extended storage is eroding margin.'
        : 'Current storage window is safe; no urgent action needed.',
      recommendation: `Sell at ${best.mandi} within the next 2-3 days for the best net return.`,
    },
    weather,
    mandiOptions,
    charts: { priceComparison, profitTrend, storageCost, weatherImpact },
    ai: {
      decision: `Sell ${formData.crop || 'your crop'} at ${best.mandi}`,
      benefits: [
        'Highest net profit among all reachable mandis',
        'Lower transport cost relative to price gain',
        'Demand trend is currently rising in this market',
      ],
      risks: [
        weather.risk === 'High' ? 'Weather may disrupt transport in the next 48 hours' : 'Minor price fluctuation possible',
        'Prices can shift ±4% before you reach the mandi',
      ],
      expectedIncome: best.netProfit,
      storageSuggestion: formData.storageDays > 5 ? 'Move to cold storage only if selling is delayed beyond 3 days' : 'Direct sale recommended, skip storage',
      transportSuggestion: best.distance > 120 ? 'Use a shared freight truck to reduce per-quintal cost' : 'Mini-truck / tempo is most cost effective',
      weatherSummary: `${weather.condition}, ${weather.risk} risk of spoilage in transit`,
    },
  }
}

export async function fetchDashboardStats() {
  await delay(300)
  return {
    todayAnalysis: 3,
    avgProfit: 8760,
    weatherAlert: 'Pre-Monsoon showers expected in 2 days',
    topMandi: 'Azadpur Mandi',
  }
}
