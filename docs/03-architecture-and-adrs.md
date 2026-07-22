# MetaBotism - Architecture and ADRs

## Target architecture

### Phase 1: local

React + TypeScript + Capacitor Android client; RTL design system; SQLite for plan/logs; secure local storage; Capacitor Local Notifications. Rule engine and content live as versioned structured data. The app is useful with zero network.

### Phase 2: VPS and WhatsApp channel

Ubuntu LTS VPS, Docker Compose, TypeScript API, PostgreSQL, background worker, optional Redis, and Caddy/Nginx HTTPS reverse proxy. Add authentication, encrypted sync, AI orchestration, validation, reports, backups, health checks, log rotation, recovery runbook, and WhatsApp webhook/channel adapter.

## ADR-001: Android APK first

Decision: ship a private APK first.

Reason: APK gives reliable private/offline use while WhatsApp can be developed in parallel. WhatsApp must never block the local product or become the clinical data store.

## ADR-005: WhatsApp as a parallel channel

Decision: start WhatsApp integration work immediately, but keep APK primary and as fallback.

Reason: WhatsApp improves reach, but requires business verification, opt-in, templates, webhooks, provider cost, rate limits, and stricter privacy handling.

## ADR-002: deterministic rules before AI

Decision: rules are the source of truth; AI explains and coaches.

Reason: clinical and safety content cannot depend on prompt memory or model availability. AI output must pass a strict schema and separate safety evaluator.

## ADR-003: TypeScript end-to-end

Decision: use TypeScript for client and VPS unless a documented operational reason requires Python.

Reason: fewer languages, shared types/validation, easier maintenance.

## ADR-004: offline-first

Decision: all core schedules, meals, substitutions, groceries, countdown, and logs work offline.

Reason: adherence must not fail because of network or VPS downtime.

## Core entities

User, device, session, consent, health profile, allergy, medicine, risk factor, semen report/raw sample/prepared sample/morphology, plan/version, meal template/scheduled meal/substitution, grocery/inventory, habit log, notification, chat message, model/rule source, safety classification/escalation, weekly report/export, audit event.

## Suggested repository shape

```text
apps/mobile
packages/domain-rules
packages/shared-types
services/api
services/worker
docs
tests
ops
```

## Non-negotiable engineering controls

- Schema validation for API and AI outputs.
- Stable IDs and timestamps on all records.
- No provider keys, DB passwords, signing keys, or messaging tokens in APK.
- Migration tests, notification reboot tests, offline/reconnect tests, security tests, and restore drills.
