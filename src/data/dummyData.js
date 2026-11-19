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
    title: 'Market price comparison',
    desc: 'Explore illustrative prices across a selection of mandis and see how markets compare.',
    icon: 'TrendingUp',
  },
  {
    title: 'Weather context',
    desc: 'Consider a sample local forecast and harvest risks as part of your planning.',
    icon: 'CloudSun',
  },
  {
    title: 'A practical recommendation',
    desc: 'See a demo suggestion that brings your crop, quantity and market options together.',
    icon: 'Lightbulb',
  },
  {
    title: 'Storage options',
    desc: 'Keep sample storage rates and holding windows alongside your market choices.',
    icon: 'Warehouse',
  },
  {
    title: 'Transport costs',
    desc: 'Compare estimated travel costs to get a clearer picture of your possible net return.',
    icon: 'Truck',
  },
  {
    title: 'Side-by-side view',
    desc: 'Review the factors behind a suggestion in one straightforward place.',
    icon: 'ListChecks',
  },
]

export const WORKFLOW_STEPS = [
  { title: 'Tell us about your crop', desc: 'Choose a crop, quantity, quality and your location.' },
  { title: 'Compare market options', desc: 'Review sample mandi prices and estimated transport costs.' },
  { title: 'Consider the context', desc: 'See illustrative weather and storage details together.' },
  { title: 'Review a suggestion', desc: 'Use the comparison as a starting point for your own decision.' },
]
