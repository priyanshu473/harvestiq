import axios from 'axios'

const TOKEN_KEY = 'harvestiq-token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 15000,
})

// Attach the JWT to every request automatically.
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = 'Bearer ' + token
  return config
})

// A single place to react to "your session is no longer valid" — the
// AuthContext subscribes to this so it can clear state and redirect.
const unauthorizedListeners = new Set()
export function onUnauthorized(listener) {
  unauthorizedListeners.add(listener)
  return () => unauthorizedListeners.delete(listener)
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      unauthorizedListeners.forEach((fn) => fn())
    }
    return Promise.reject(error)
  },
)

// ---------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------

export async function registerUser({ name, email, phone, password }) {
  const { data } = await api.post('/auth/register', { name, email, phone, password })
  return data // { token, userId, name, email }
}

export async function loginUser({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export async function fetchCurrentUser() {
  const { data } = await api.get('/auth/me')
  return data
}

// ---------------------------------------------------------------------
// Lookup data (Analyzer form dropdowns) — public, no auth required
// ---------------------------------------------------------------------

export async function fetchStates() {
  const { data } = await api.get('/states')
  return data
}

export async function fetchDistricts(state) {
  const { data } = await api.get('/districts', { params: { state } })
  return data
}

export async function fetchCrops() {
  const { data } = await api.get('/crops')
  return data
}

export async function fetchQualityGrades() {
  const { data } = await api.get('/quality-grades')
  return data
}

// ---------------------------------------------------------------------
// Live data — public, no auth required
// ---------------------------------------------------------------------

export async function fetchMandiPrices(crop) {
  const { data } = await api.get('/mandi-prices', { params: { crop } })
  return data.map((row) => ({ mandi: row.mandi, price: Number(row.price) }))
}

export async function fetchWeather(district) {
  const { data } = await api.get('/weather', { params: { district } })
  return {
    condition: data.condition,
    risk: data.risk,
    temp: data.temperature,
    humidity: data.humidity,
  }
}

// ---------------------------------------------------------------------
// Analyzer — requires auth
// ---------------------------------------------------------------------

export async function runAnalysis(formData) {
  const payload = {
    crop: formData.crop,
    quantity: Number(formData.quantity),
    state: formData.state,
    district: formData.district,
    harvestDate: formData.harvestDate,
    quality: formData.quality,
    storageDays: Number(formData.storageDays),
    distance: Number(formData.distance),
    transportCost: Number(formData.transportCost),
  }

  const { data } = await api.post('/analyze', payload)

  return {
    analysisId: data.analysisId,
    summary: data.summary,
    weather: {
      condition: data.weather.condition,
      risk: data.weather.risk,
      temp: data.weather.temperature,
      humidity: data.weather.humidity,
    },
    mandiOptions: data.mandiOptions,
    charts: {
      priceComparison: data.charts.priceComparison.map((p) => ({ name: p.label, price: p.value })),
      profitTrend: data.charts.profitTrend.map((p) => ({ day: p.label, profit: p.value })),
      storageCost: data.charts.storageCost.map((p) => ({ day: p.label, cost: p.value })),
      weatherImpact: data.charts.weatherImpact.map((p) => ({ name: p.label, value: p.value })),
    },
    ai: data.ai,
  }
}

export async function fetchAnalysisById(analysisId) {
  const { data } = await api.get(`/analyses/${analysisId}`)
  return data
}

// ---------------------------------------------------------------------
// Dashboard / history / activity / bookmarks — all requires auth,
// all scoped to whoever the token belongs to (no userId params anymore)
// ---------------------------------------------------------------------

export async function fetchDashboardStats() {
  const { data } = await api.get('/dashboard/stats')
  return data
}

export async function fetchHistory() {
  const { data } = await api.get('/history')
  return data
}

export async function clearHistoryApi() {
  await api.delete('/history')
}

export async function fetchActivity() {
  const { data } = await api.get('/activity')
  return data
}

export async function toggleBookmarkApi(analysisId) {
  const { data } = await api.post('/bookmarks/toggle', { analysisId })
  return data.bookmarked
}

export async function fetchBookmarks() {
  const { data } = await api.get('/bookmarks')
  return data
}

// ---------------------------------------------------------------------
// Contact — public
// ---------------------------------------------------------------------

export async function submitContact(payload) {
  await api.post('/contact', payload)
}

export default api
