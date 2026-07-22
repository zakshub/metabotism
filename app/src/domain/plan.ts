export const PLAN_VERSION = '2026.07.22-faraz-pilot-v1'
export const DEFAULT_TEST_DATE = '2026-11-02'

export const groceryItems = [
  'Eggs · 12',
  'Yoghurt · 7 cups',
  'Apples and bananas',
  'Lentils / chickpeas',
  'Walnuts, almonds, flax',
]

export function daysUntil(dateString: string, today = new Date()) {
  const target = new Date(`${dateString}T00:00:00`)
  const current = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.max(0, Math.ceil((target.getTime() - current.getTime()) / 86400000))
}

export function formatTargetDate(dateString: string, language: 'en' | 'ur') {
  const date = new Date(`${dateString}T00:00:00`)
  return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ur-PK', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
}
