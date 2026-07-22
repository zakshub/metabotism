export const PLAN_VERSION = 'local-v2'
export const DEFAULT_TEST_DATE = '2026-11-02'

export type PlanTask = {
  id: string
  time: string
  title: string
  detail: string
  reason: string
  category: 'meal' | 'movement' | 'sleep' | 'water'
}

export const planTasks: PlanTask[] = [
  { id: 'breakfast', time: '8:00 - 9:00', title: 'Eggs, roti, fruit and yoghurt', detail: '2 boiled eggs + 1 roti + 1 fruit + yoghurt', reason: 'For protein and daily nutrition balance', category: 'meal' },
  { id: 'walk', time: '12:30 - 1:00', title: 'Take a gentle walk', detail: '10–30 minutes at a comfortable pace', reason: 'Small movement supports daily consistency', category: 'movement' },
  { id: 'water', time: 'Throughout the day', title: 'Drink water', detail: 'Keep a bottle nearby and take regular sips', reason: 'A simple cue makes hydration easier', category: 'water' },
  { id: 'sleep', time: '10:30 - 11:00', title: 'Start your wind-down', detail: 'Put the phone away and prepare for sleep', reason: 'A regular sleep window supports recovery', category: 'sleep' },
]

export const groceryItems = ['Eggs', 'Whole-wheat roti', 'Seasonal fruit', 'Plain yoghurt', 'Water bottle']

export function daysUntil(date: string, now = new Date()) {
  const target = new Date(`${date}T00:00:00`)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / 86400000))
}

export function formatTargetDate(date: string, language: 'en' | 'ur') {
  return new Intl.DateTimeFormat(language === 'ur' ? 'ur-PK' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T00:00:00`))
}

export function localCoachTip(completed: number, language: 'en' | 'ur') {
  if (completed === 0) return language === 'ur' ? 'ایک چھوٹا کام ابھی مکمل کریں؛ تسلسل رفتار سے زیادہ اہم ہے۔' : 'Complete one small task now; consistency matters more than speed.'
  if (completed < planTasks.length) return language === 'ur' ? `${completed} کام مکمل ہو چکے ہیں۔ اگلا آسان قدم جاری رکھیں۔` : `${completed} tasks are complete. Keep the next step easy and visible.`
  return language === 'ur' ? 'آج کے تمام کام مکمل ہیں۔ کل بھی اسی سادہ رفتار سے چلیں۔' : 'All today’s tasks are complete. Repeat the same simple rhythm tomorrow.'
}
