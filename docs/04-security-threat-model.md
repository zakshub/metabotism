# MetaBotism - Security and Threat Model

## Assets

Health profile, semen reports, medicines/supplements, habits, location/food data, chat history, consent records, authentication sessions, exports, and AI/provider credentials.

## Main threats and controls

| Threat | Control |
|---|---|
| Lost/stolen phone exposes health data | PIN/biometric lock, encrypted local storage, minimal data, remote/session revocation when VPS exists |
| APK or logs leak secrets | server-side secrets only, redaction, secret scanning, crash-output review |
| AI hallucinates medical advice | approved knowledge base, deterministic rules, structured output, safety evaluator, refusal tests |
| Unauthorized sharing | explicit consent per export/share, expiry/revocation, audit event |
| VPS compromise | HTTPS, least privilege, patched Ubuntu, firewall, isolated DB, backups, rotation, monitoring |
| Backup becomes an unprotected copy | encrypted backups, restricted destination, tested restore, retention policy |
| Prompt injection or malicious chat | treat user text as untrusted; retrieve only approved facts; never let model alter rules or execute purchases |
| Wrong report comparison | raw/prepared sample types and dates are distinct typed fields; comparison tests |
| Notification misuse or fatigue | configurable schedule, quiet hours, retry limits, opt-out, pilot measurement |
| Accidental purchase | preview only; explicit confirmation required for every order-affecting action |

## Privacy rules

Collect only necessary data. Do not send raw medical images to an AI provider unless required and explicitly consented. Prefer structured values. Support user-controlled export and permanent deletion. Administrator access is denied by default until an explicit policy is approved.

## Incident response

Disable affected integration, preserve minimal audit evidence, revoke sessions/keys, notify Faraz if data may be exposed, restore from a known-good backup, document root cause, and add a regression test before re-enabling.
