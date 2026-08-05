export const CROPS = [
  'Wheat', 'Rice (Paddy)', 'Cotton', 'Sugarcane', 'Soybean', 'Maize', 'Mustard',
  'Groundnut', 'Onion', 'Potato', 'Tomato', 'Turmeric', 'Chana (Gram)', 'Bajra', 'Jowar',
]

export const STATES = [
  'Uttar Pradesh', 'Punjab', 'Haryana', 'Madhya Pradesh', 'Maharashtra',
  'Rajasthan', 'Gujarat', 'Bihar', 'Karnataka', 'Andhra Pradesh',
]

export const DISTRICTS_BY_STATE = {
  'Uttar Pradesh': ['Ghaziabad', 'Meerut', 'Lucknow', 'Kanpur', 'Agra'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Patiala', 'Jalandhar'],
  'Haryana': ['Karnal', 'Hisar', 'Panipat', 'Rohtak'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Ujjain', 'Gwalior'],
  'Maharashtra': ['Nashik', 'Pune', 'Nagpur', 'Aurangabad'],
  'Rajasthan': ['Jaipur', 'Kota', 'Sriganganagar', 'Alwar'],
  'Gujarat': ['Rajkot', 'Ahmedabad', 'Surat', 'Bhavnagar'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
  'Karnataka': ['Belagavi', 'Hubballi', 'Mysuru', 'Davanagere'],
  'Andhra Pradesh': ['Guntur', 'Kurnool', 'Vijayawada', 'Nellore'],
}

export const QUALITY_GRADES = ['FAQ (Fair Average Quality)', 'Grade A', 'Grade B', 'Premium Export']

export const MANDI_NAMES = [
  'Azadpur Mandi', 'Ghazipur Mandi', 'Lasalgaon Mandi', 'Indore Krishi Mandi',
  'Vashi APMC', 'Bhopal Mandi', 'Karnal Grain Market', 'Rajkot Yard',
  'Kanpur Grain Market', 'Guntur Chilli Yard',
]

export const WEATHER_CONDITIONS = [
  { label: 'Clear Sky', risk: 'Low' },
  { label: 'Partly Cloudy', risk: 'Low' },
  { label: 'Humid', risk: 'Medium' },
  { label: 'Pre-Monsoon Showers', risk: 'High' },
  { label: 'Heatwave', risk: 'Medium' },
]

export const DASHBOARD_ACTIVITY = [
  { id: 1, crop: 'Wheat', action: 'Analyzed', time: '2h ago', profit: '+₹8,400' },
  { id: 2, crop: 'Onion', action: 'Bookmarked', time: '5h ago', profit: '+₹5,120' },
  { id: 3, crop: 'Cotton', action: 'Analyzed', time: '1d ago', profit: '+₹14,900' },
  { id: 4, crop: 'Maize', action: 'Exported Report', time: '2d ago', profit: '+₹3,760' },
  { id: 5, crop: 'Soybean', action: 'Analyzed', time: '3d ago', profit: '+₹9,050' },
]

export const FEATURES = [
  {
    title: 'Live Mandi Prices',
    desc: 'Real-time price feeds aggregated across 500+ mandis, refreshed every hour.',
    icon: 'TrendingUp',
  },
  {
    title: 'Weather Forecast',
    desc: '7-day hyperlocal forecasts with spoilage & harvest-risk scoring built in.',
    icon: 'CloudSun',
  },
  {
    title: 'AI Prediction',
    desc: 'Ensemble models trained on a decade of mandi data predict tomorrow\'s best price.',
    icon: 'BrainCircuit',
  },
  {
    title: 'Cold Storage',
    desc: 'Find nearby storage capacity, daily rates and spoilage-safe holding windows.',
    icon: 'Warehouse',
  },
  {
    title: 'Transport Optimization',
    desc: 'Route and vehicle-type suggestions that minimise per-quintal transit cost.',
    icon: 'Truck',
  },
  {
    title: 'Profit Calculator',
    desc: 'One tap to compare net profit across every reachable mandi, ranked instantly.',
    icon: 'Calculator',
  },
]

export const WORKFLOW_STEPS = [
  { title: 'Farmer Enters Crop', desc: 'Tell us crop, quantity, quality & location.' },
  { title: 'Government APIs', desc: 'Pulling live Agmarknet & eNAM price feeds.' },
  { title: 'Weather APIs', desc: 'Cross-checking 7-day forecast for your district.' },
  { title: 'Cold Storage APIs', desc: 'Scanning nearby storage capacity & rates.' },
  { title: 'AI Prediction', desc: 'Ensemble model scores every reachable mandi.' },
  { title: 'Profit Analysis', desc: 'Net profit computed after transport & storage.' },
  { title: 'Recommendation', desc: 'Best mandi & sell-window delivered to you.' },
]
