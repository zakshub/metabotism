# MetaBotism - Product Requirements Document

## User and context

Initial user: Faraz. The first plan window is 2026-07-21 through 2026-11-02, with a provisional last ejaculation on 2026-10-28 evening and a comparable follow-up test target on 2026-11-02. Dates must be editable profile data, never hard-coded.

The app must preserve the interpretation rule that raw semen results and post-preparation results are different metrics. It must not imply that one report proves or disproves fertility or predicts a child's health.

## MVP scope

### Onboarding and privacy

- Consent, language, wake/sleep and meal times, city, food availability, allergies, medical conditions, medicines, clinician-approved supplements, test date, notification permission, privacy settings.
- PIN/biometric lock, local encryption where supported, export, permanent delete, and consent revocation.

### Today

- Date, test countdown, next action, daily completion score, meal cards, activity tasks, heat precautions, and urgent medical-help entry.
- Notification schedules that survive app restart and device reboot.

### Chat-like coaching

- Urdu RTL bubbles, message history, quick actions: Done, Doing now, Not available, Give alternative, I am outside, Medical issue, Open groceries.
- Rule-based templates work offline; AI is not required for the core experience.

### Meal and habit engine

- Approved daily meals, quantities, windows, weekly protein rotation, allergies, inventory, home/outside state, and safe substitutions.
- Track meals, substitutions, walking, sleep, water, heat precautions, and weight.
- No free-form AI-generated meal quantities.

### Groceries

- Seven-day list generated from approved menus and inventory.
- Inventory states: Available, Low, Finished, Purchased, Substitute required.
- Copy list and open Foodpanda. No automatic checkout or unconfirmed payment/order/address.

### Progress and reports

- Daily/weekly adherence, skipped tasks, substitutions, response latency, burden, and consistency.
- User-approved export for clinician/trusted person; no sharing without Faraz's explicit consent.

## Safety requirements

The app must never diagnose, prescribe/stop medicine, restart Nitrix, calculate supplement dose, recommend testosterone or tobacco, promise numerical semen improvement, override urgent escalation, or purchase without confirmation.

Escalate severe testicular pain/swelling, high fever with severe urinary symptoms, blood in urine, chest pain, fainting, severe palpitations, breathing difficulty, serious supplement reaction, or self-harm crisis.

## Parallel WhatsApp scope from day one

WhatsApp Business is included in initial discovery and architecture while the APK remains the primary MVP. Build the channel adapter, consent/opt-in model, webhook contract, message mapping, approved template inventory, delivery/retry states, and safe fallback to APK. Production messaging depends on Meta/provider approval, phone setup, templates, webhook hosting, and cost.

WhatsApp is not the source of truth. Sensitive reports, full history, exports, and complex settings remain in the locked APK/account flow unless separately approved.

## Out of initial delivery

Clinician portal, multi-user administration, Urdu voice output, advanced grocery ordering, and commercial monetization. Production WhatsApp rollout follows its consent, privacy, and safety gates.

## Acceptance criteria

- Faraz installs and uses the APK without developer help.
- RTL Urdu is correct on the target device.
- Core plan and groceries work offline.
- Meals support completion, substitution, and unavailable-item handling.
- Test-date changes recalculate all dependent reminders.
- AI/safety tests reject prohibited medical claims and unsafe supplement/tobacco guidance.
- Data export/delete works; no secrets appear in APK, logs, crash output, or source history.
- Backup restoration and VPS recovery are tested before pilot sign-off.
