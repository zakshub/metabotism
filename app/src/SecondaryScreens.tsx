import { useState } from 'react'
import './secondary.css'

type Lang = 'en' | 'ur'
type Props = { language: Lang }

const labels = {
  en: { workspace: 'Plan workspace', back: 'Back to workspace', open: 'Open workspace', daily: 'Daily progress details', weekly: 'Weekly overview', notifications: 'Notifications centre', meal: 'Meal details & benefits', replace: 'Food replacements', grocery: 'Grocery item details', calendar: 'Weekly meal calendar', habits: 'Daily habits', water: 'Water & walking', heat: 'Heat exposure', sleep: 'Sleep & recovery' },
  ur: { workspace: 'پلان ورک اسپیس', back: 'ورک اسپیس پر واپس', open: 'تفصیل دیکھیں', daily: 'روزانہ پروگریس', weekly: 'ہفتہ وار جائزہ', notifications: 'نوٹیفکیشن مرکز', meal: 'کھانے کی تفصیل اور فوائد', replace: 'کھانے کے متبادل', grocery: 'گروسری آئٹم کی تفصیل', calendar: 'ہفتہ وار کھانے کا کیلنڈر', habits: 'روزانہ عادات', water: 'پانی اور چہل قدمی', heat: 'گرمی سے بچاؤ', sleep: 'نیند اور ریکوری' },
}

const data = (l: typeof labels.en) => [
  ['daily', l.daily, ['Breakfast · Completed', 'Walking · 22 of 30 minutes', 'Water · 5 of 8 glasses', 'Sleep routine · Not started']],
  ['weekly', l.weekly, ['Monday · 62%', 'Tuesday · 75%', 'Wednesday · 81%', 'Thursday · 54%', 'Friday · 76%', 'Weekend · Keep the rhythm']],
  ['notifications', l.notifications, ['Walk reminder · 6:30 PM', 'Prepare tomorrow’s breakfast · 9:00 PM', 'Follow-up test · 103 days', 'No urgent notifications']],
  ['meal', l.meal, ['Protein supports daily nutrition balance.', 'Keep portions realistic and repeatable.', 'Use an approved substitute if unavailable.']],
  ['replace', l.replace, ['Eggs → lentils or plain yoghurt', 'Roti → whole-wheat bread', 'Seasonal fruit → guava or apple', 'No unapproved supplement additions']],
  ['grocery', l.grocery, ['Category · Fruit', 'Use · Breakfast or snack', 'Status · To buy', 'Choose fresh and wash before use.']],
  ['calendar', l.calendar, ['Monday · Eggs + roti', 'Tuesday · Lentils + fruit', 'Wednesday · Yoghurt + seasonal fruit', 'Thursday · Repeat the approved rotation', 'Friday · Review groceries']],
  ['habits', l.habits, ['Meal routine · Active', 'Walking · 22 minutes', 'Water · 5 glasses', 'Sleep window · Needs attention']],
  ['water', l.water, ['Water · 5 / 8 glasses', 'Walking · 22 / 30 minutes', 'Next cue · Take a bottle on your walk', 'Progress is a signal, not a medical diagnosis.']],
  ['heat', l.heat, ['Avoid prolonged direct heat.', 'Keep water nearby.', 'Choose a cooler walking window.', 'Seek medical help for concerning symptoms.']],
  ['sleep', l.sleep, ['Target window · 10:30–11:00 PM', 'Wind down · Put the phone away', 'Review tomorrow’s first meal', 'No perfection requirement.']],
] as const

export default function SecondaryScreens({ language }: Props) {
  const l = labels[language]
  const [screen, setScreen] = useState<string | null>(null)
  const items = data(l)
  if (screen) {
    const item = items.find(([id]) => id === screen)!
    return <div className="secondary detail-screen"><button className="back-link" onClick={() => setScreen(null)}>← {l.back}</button><div className="detail-header"><span className="detail-badge">WORKSPACE</span><h1>{item[1]}</h1><p>{language === 'ur' ? 'آپ کے منظور شدہ روٹین کا عملی حصہ۔' : 'A practical view of your approved routine.'}</p></div><div className="detail-grid">{item[2].map((text, i) => <div className={`detail-row ${i === 0 ? 'highlight' : ''}`} key={text}><span>{i < 3 ? '✓' : '○'}</span><b>{text}</b>{i === 0 && <small>{language === 'ur' ? 'آج' : 'Today'}</small>}</div>)}</div><div className="safe-note">ⓘ {language === 'ur' ? 'یہ کوچنگ سیاق ہے، طبی تشخیص نہیں۔' : 'This is coaching context, not a medical diagnosis.'}</div></div>
  }
  return <div className="secondary"><div className="secondary-title"><span className="eyebrow">WORKSPACES</span><h1>{l.workspace}</h1><p>{language === 'ur' ? 'پلان کے ہر حصے کو تفصیل سے دیکھیں۔' : 'Explore every part of your approved routine.'}</p></div><div className="secondary-grid">{items.map(([id, title]) => <button className="secondary-card" key={id} onClick={() => setScreen(id)}><span>{String(items.findIndex((x) => x[0] === id) + 1).padStart(2, '0')}</span><b>{title}</b><small>{l.open} →</small></button>)}</div></div>
}
