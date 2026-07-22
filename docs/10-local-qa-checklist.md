# Local QA checklist

## Automated checks

- [x] `npm.cmd run lint`
- [x] `npm.cmd run build`
- [x] `npm.cmd run build:api`
- [x] PWA manifest included
- [x] Service worker included
- [x] Local JSON export implemented
- [x] Local JSON restore implemented
- [x] Name and age validation implemented
- [x] Daily task state resets on a new date

## Manual browser checks before VPS

- [ ] Landing screen at desktop width
- [ ] Landing screen at mobile width
- [ ] Name/age onboarding validation
- [ ] Home navigation and task completion
- [ ] Daily plan timeline actions
- [ ] Grocery checklist persistence
- [ ] Progress screen values
- [ ] Reports screen readability
- [ ] Coach screen safety copy
- [ ] Settings save/reset/export/restore
- [ ] English to Urdu switch
- [ ] RTL layout on desktop and mobile
- [ ] PWA install prompt and offline shell

## Local process note

If Vite reports ports 5173 or 5174 as occupied, stop old Vite terminals with `Ctrl+C` and run the app on a clean port:

```bat
npm.cmd run dev -- --host 127.0.0.1 --port 5199
```
