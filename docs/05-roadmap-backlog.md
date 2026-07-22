# MetaBotism - Roadmap and Ordered Backlog

## Stage 0 - decisions and discovery (1-2 days)

Confirm target Android version/device, APK vs private Play testing, VPS provider/region/budget, domain/email ownership, AI provider/cost/retention, backup destination, notification times, admin visibility, allergies/dislikes/city/food access, WhatsApp Business account/phone/provider, opt-in language, template categories, and whether voice is deferred. No silent assumptions.

## Stage 1 - product contract and foundation (1-2 days)

Create repository structure, TypeScript project, domain types, versioned plan schema, rule fixtures, design tokens, RTL typography, consent/privacy model, and test strategy.

## Stage 2 - clickable prototype (2-3 days)

Build Today, Chat, Groceries, Progress, Test Countdown, Settings, onboarding, and urgent-help flow. Render screenshots on the target Android device and obtain visual approval.

## Stage 3 - offline APK (about 1 week)

Implement SQLite persistence, deterministic schedule, meal engine, substitutions, inventory, grocery generation, logs, scoring, countdown recalculation, local notifications, offline recovery, export/delete, and signed private test build.

## Stage 3A - WhatsApp parallel workstream

Implement provider-neutral channel interfaces, consent/opt-in records, webhook contract, inbound quick-reply mapping, outbound template catalog, delivery/retry states, rate-limit handling, redaction, and a disabled/sandbox adapter. Do not send production health data until approval and safety tests pass.

## Stage 4 - VPS and AI (about 1 week after local sign-off)

Deploy API/database/worker, authentication, encrypted sync, versioned plan delivery, AI orchestration, schema validation, safety evaluator, audit logs, backups, health checks, monitoring, and rollback/recovery documentation.

## Stage 5 - pilot (minimum 2 weeks)

Measure readability, tone, notification fatigue, unsafe substitutions, false claims, offline recovery, battery impact, backup restore, adherence, and user burden. Fix findings before expansion.

## Stage 6 - later scale

Enable production WhatsApp Business messaging after its privacy, consent, approval, and safety gates. Then consider clinician portal, multi-user tenancy, Urdu voice, richer grocery integrations, analytics, and commercialization.

## Definition of done for each feature

Requirement linked to acceptance criterion; happy path and failure path tested; offline behavior defined; sensitive data reviewed; logs redacted; screenshots or device verification completed; documentation and rollback impact updated.
