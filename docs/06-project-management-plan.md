# MetaBotism - Project Management Plan

## Working method

One visible task at a time. Every task has an owner, status, acceptance test, evidence, and next dependency. Work proceeds Local -> review -> VPS -> pilot. No deep backend work before prototype approval; no AI before offline rules are verified.

## Milestone gates

1. Scope gate: decisions recorded and unresolved items visible.
2. UX gate: RTL prototype approved on target device.
3. Local gate: offline APK meets acceptance criteria.
4. VPS gate: auth, sync, backups, safety, and recovery verified.
5. Pilot gate: two-week evidence review and go/no-go decision.

## Weekly reporting template

- Completed: what changed and evidence.
- In progress: current task and blocker.
- Risks: safety, privacy, technical, schedule.
- Decisions needed: exact user decision, deadline, consequence.
- Next visible action: one concrete task.

## Quality gates

Unit tests for rules; integration tests for persistence/sync; Android device tests for notifications/reboot/RTL; offline and reconnect tests; AI refusal and schema tests; security/secret scans; backup restore drill; signed APK verification; pilot feedback log.

## Rollback principles

Keep versioned plan data and migrations. Never mutate a live clinical rule silently. Roll back app/API/plan version independently where possible, preserve audit records, and document recovery steps before pilot.

## Current risks

- Medical content requires clinician validation before treating it as approved.
- Dates and meal quantities may change; use configuration/versioning.
- Urdu RTL rendering and local notification behavior must be tested on the actual device.
- VPS, domain, AI vendor, privacy policy, and admin access are unresolved.
