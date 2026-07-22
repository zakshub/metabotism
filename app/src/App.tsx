import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { DEFAULT_TEST_DATE, daysUntil, formatTargetDate, groceryItems, localCoachTip, planTasks } from './domain/plan'

type Language = 'en' | 'ur'
type Tab = 'today' | 'groceries' | 'progress' | 'settings'
type Profile = { name: string; age: string }
type Saved = { profile: Profile; language: Language; nastaliq: boolean; completed: string[]; groceries: string[]; history: Record<string, string[]> }

const copy = {
  en: { today: 'Today', groceries: 'Groceries', progress: 'Progress', settings: 'Settings', coach: 'Private coach', welcome: 'Welcome to MetaBotism', intro: 'Your private adherence coach. Let’s personalise your plan.', name: 'Your name', age: 'Your age', namePlaceholder: 'Enter your name', agePlaceholder: 'Enter your age', continue: 'Continue', greeting: 'Your day,', subtitle: 'Small steps. Consistent progress.', streak: 'day streak', test: 'Until follow-up test', next: 'What to do now', review: 'Today’s review', meals: 'tasks done', tip: 'Local coach tip', list: 'This week’s list', progressTitle: 'Your progress', settingsTitle: 'Your settings', save: 'Save changes', reset: 'Reset local data', font: 'Content font', regular: 'Regular', nastaliq: 'Nastaliq', local: 'Works locally without AI', localText: 'Your plan, tracking and coaching rules run on this device. AI chat will be connected later.', complete: 'Complete', undo: 'Undo', done: 'done', days: 'days', noData: 'Complete tasks to build your local progress.' },
  ur: { today: 'آج', groceries: 'گروسریز', progress: 'پروگریس', settings: 'ترتیبات', coach: 'ذاتی کوچ', welcome: 'MetaBotism میں خوش آمدید', intro: 'آپ کا ذاتی adherence coach۔ آئیے پلان کو ذاتی بناتے ہیں۔', name: 'آپ کا نام', age: 'آپ کی عمر', namePlaceholder: 'نام لکھیں', agePlaceholder: 'عمر لکھیں', continue: 'جاری رکھیں', greeting: 'آپ کا دن،', subtitle: 'چھوٹے قدم، مسلسل بہتری۔', streak: 'دن مسلسل', test: 'فالو اَپ ٹیسٹ تک', next: 'اب کیا کرنا ہے', review: 'آج کا جائزہ', meals: 'کام مکمل', tip: 'مقامی کوچ کا مشورہ', list: 'اس ہفتے کی فہرست', progressTitle: 'آپ کی پیش رفت', settingsTitle: 'آپ کی ترتیبات', save: 'تبدیلیاں محفوظ کریں', reset: 'مقامی ڈیٹا ری سیٹ کریں', font: 'مواد کا فونٹ', regular: 'عام', nastaliq: 'نستعلیق', local: 'AI کے بغیر بھی چلتا ہے', localText: 'آپ کا پلان، ٹریکنگ اور کوچنگ کے اصول اسی ڈیوائس پر چلتے ہیں۔ AI چیٹ بعد میں شامل ہوگی۔', complete: 'مکمل کریں', undo: 'واپس کریں', done: 'مکمل', days: 'دن', noData: 'مقامی پروگریس بنانے کے لیے کام مکمل کریں۔' },
}

const emptySaved: Saved = { profile: { name: '', age: '' }, language: 'en', nastaliq: false, completed: [], groceries: [], history: {} }
const storageKey = 'metabotism-local-v2'

function loadSaved(): Saved { try { return { ...emptySaved, ...JSON.parse(localStorage.getItem(storageKey) || '{}') } } catch { return emptySaved } }
function saveSaved(value: Saved) { localStorage.setItem(storageKey, JSON.stringify(value)) }

export default function App() {
  const [saved, setSaved] = useState<Saved>(loadSaved)
  const [profileDraft, setProfileDraft] = useState(saved.profile)
  const [tab, setTab] = useState<Tab>('today')
  const [showOnboarding, setShowOnboarding] = useState(!saved.profile.name)
  const t = copy[saved.language]
  const completed = saved.completed
  const completedCount = completed.length
  const completion = Math.round((completedCount / planTasks.length) * 100)
  const todayKey = new Date().toISOString().slice(0, 10)
  const todayHistory = saved.history[todayKey] || []
  const streak = Math.min(7, Math.max(0, todayHistory.length ? 1 : completedCount ? 1 : 0))

  useEffect(() => saveSaved(saved), [saved])
  const tip = useMemo(() => localCoachTip(completedCount, saved.language), [completedCount, saved.language])

  function toggleTask(id: string) { setSaved((current) => ({ ...current, completed: current.completed.includes(id) ? current.completed.filter((item) => item !== id) : [...current.completed, id], history: { ...current.history, [todayKey]: [...new Set([...(current.history[todayKey] || []), id])] } })) }
  function toggleGrocery(item: string) { setSaved((current) => ({ ...current, groceries: current.groceries.includes(item) ? current.groceries.filter((value) => value !== item) : [...current.groceries, item] })) }
  function switchLanguage() { setSaved((current) => ({ ...current, language: current.language === 'en' ? 'ur' : 'en' })) }
  function finishOnboarding(event: React.FormEvent) { event.preventDefault(); if (profileDraft.name.trim() && profileDraft.age.trim()) { setSaved((current) => ({ ...current, profile: { name: profileDraft.name.trim(), age: profileDraft.age.trim() } })); setShowOnboarding(false) } }
  function reset() { setSaved(emptySaved); setProfileDraft(emptySaved.profile); setShowOnboarding(true) }

  if (showOnboarding) return <main className="app-shell onboarding"><div className="brand-mark large">م</div><h1>{t.welcome}</h1><p className="intro-copy">{t.intro}</p><form onSubmit={finishOnboarding} className="onboarding-form"><label>{t.name}<input required value={profileDraft.name} placeholder={t.namePlaceholder} onChange={(e) => setProfileDraft({ ...profileDraft, name: e.target.value })} /></label><label>{t.age}<input required inputMode="numeric" value={profileDraft.age} placeholder={t.agePlaceholder} onChange={(e) => setProfileDraft({ ...profileDraft, age: e.target.value })} /></label><button className="primary-button" type="submit">{t.continue}</button></form><button className="language-switch" onClick={switchLanguage}>{saved.language === 'en' ? 'اردو' : 'English'}</button></main>

  return <main className={`app-shell ${saved.language === 'ur' ? 'rtl' : ''} ${saved.nastaliq ? 'nastaliq-mode' : ''}`}>
    <header className="topbar"><div className="brand-lockup"><div className="brand-mark">م</div><div><div className="brand-name">MetaBotism</div><div className="brand-status"><span /> {t.coach}</div></div></div><div className="header-actions"><button className="language-switch" onClick={switchLanguage}>{saved.language === 'en' ? 'اردو' : 'English'}</button><button className="font-switch" onClick={() => setSaved({ ...saved, nastaliq: !saved.nastaliq })}>{saved.nastaliq ? 'Aa' : 'خط'}</button></div></header>
    {tab === 'today' && <section className="page-content"><div className="greeting-row"><div><p className="eyebrow">{new Date().toLocaleDateString(saved.language === 'ur' ? 'ur-PK' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}</p><h1>{t.greeting} {saved.profile.name}</h1><p className="muted">{t.subtitle} · {saved.profile.age}</p></div><div className="streak"><strong>{streak}</strong><span>{t.streak}</span></div></div><div className="countdown-card"><div><span className="card-label">{t.test}</span><strong className="countdown-number">{daysUntil(DEFAULT_TEST_DATE)} <small>{t.days}</small></strong><span className="countdown-note">{formatTargetDate(DEFAULT_TEST_DATE, saved.language)}</span></div><div className="ring"><span>{completion}%</span></div></div><div className="section-heading"><h2>{t.next}</h2><span>{completedCount} / {planTasks.length}</span></div>{planTasks.map((task) => <article className={`task-card ${completed.includes(task.id) ? 'completed' : ''}`} key={task.id}><div className="task-icon">{task.category === 'meal' ? '🥣' : task.category === 'movement' ? '🚶' : task.category === 'water' ? '💧' : '🌙'}</div><div className="task-copy"><span className="task-time">{task.time}</span><h3>{task.title}</h3><p>{task.detail}</p><span className="reason">{task.reason}</span></div><button className="done-button" onClick={() => toggleTask(task.id)} aria-label={completed.includes(task.id) ? t.undo : t.complete}>{completed.includes(task.id) ? '✓' : '○'}</button></article>)}<div className="section-heading"><h2>{t.tip}</h2></div><div className="coach-tip"><span>✦</span><div><p>{tip}</p></div></div></section>}
    {tab === 'groceries' && <section className="page-content"><div className="section-heading"><h1>{t.list}</h1><span>{saved.groceries.length}/{groceryItems.length}</span></div>{groceryItems.map((item) => <button className={`list-row ${saved.groceries.includes(item) ? 'completed' : ''}`} key={item} onClick={() => toggleGrocery(item)}><span>{saved.groceries.includes(item) ? '✓' : '○'}</span>{item}</button>)}</section>}
    {tab === 'progress' && <section className="page-content"><h1>{t.progressTitle}</h1><div className="stats-grid"><div className="stat-card"><strong>{completion}%</strong><span>{t.done}</span></div><div className="stat-card"><strong>{completedCount}</strong><span>{t.today}</span></div><div className="stat-card"><strong>{streak}</strong><span>{t.streak}</span></div></div><div className="coach-tip"><span>✦</span><p>{completedCount ? tip : t.noData}</p></div></section>}
    {tab === 'settings' && <section className="page-content"><h1>{t.settingsTitle}</h1><div className="settings-card"><label>{t.name}<input value={profileDraft.name} onChange={(e) => setProfileDraft({ ...profileDraft, name: e.target.value })} /></label><label>{t.age}<input value={profileDraft.age} onChange={(e) => setProfileDraft({ ...profileDraft, age: e.target.value })} /></label><button className="primary-button" onClick={() => setSaved({ ...saved, profile: profileDraft })}>{t.save}</button><p className="muted">{t.font}: <button className="font-switch" onClick={() => setSaved({ ...saved, nastaliq: !saved.nastaliq })}>{saved.nastaliq ? t.nastaliq : t.regular}</button></p><div className="coach-tip"><span>✓</span><div><strong>{t.local}</strong><p>{t.localText}</p></div></div><button className="danger-button" onClick={reset}>{t.reset}</button></div></section>}
    <nav className="bottom-nav">{([['today','⌂',t.today],['groceries','🛒',t.groceries],['progress','◔',t.progress],['settings','⚙',t.settings]] as const).map(([id, icon, label]) => <button className={tab === id ? 'active' : ''} key={id} onClick={() => setTab(id)}><span>{icon}</span>{label}</button>)}</nav>
  </main>
}
