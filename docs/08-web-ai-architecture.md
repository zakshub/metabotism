# MetaBotism - Web Dashboard and AI Architecture

## Decision

The first product is a responsive web dashboard. Android/Capacitor remains optional. The browser never calls OpenAI directly.

```text
Browser dashboard
    -> same-origin /api/chat
TypeScript API
    -> deterministic MetaBotism plan and safety contract
    -> OpenAI Responses API using server-only OPENAI_API_KEY
```

## Why this is the right MVP

- No Android SDK or APK distribution is required for the pilot.
- Desktop and mobile browsers use one codebase.
- VPS deployment later is a move of the same API and built web assets.
- WhatsApp can become another channel adapter calling the same API.

## AI boundary

The model may explain approved actions, motivate, summarize adherence, and offer compliant substitutions. It may not diagnose, prescribe, change medicines, restart/dose supplements, promise fertility outcomes, recommend tobacco, or override medical escalation.

The deterministic plan remains the source of truth. The current API passes a compact approved-plan contract and user profile to the Responses API with `store: false`. Before production, add authentication, rate limiting, persistent consent/audit records, server-side redaction, and a separate response safety evaluator.

## Data flow

1. User submits a chat message from the browser.
2. API validates message, language, profile, and bounded history with Zod.
3. API adds the approved plan and safety contract.
4. API calls OpenAI with the secret key loaded from the server environment.
5. API returns only the validated reply text and model metadata.

## Local operation

- Vite: `http://127.0.0.1:5173`
- API: `http://127.0.0.1:8787`
- Vite proxies `/api` to the API.
- `.env` is local-only and ignored by Git.

## VPS operation

Run the API behind HTTPS with Docker Compose, PostgreSQL, backups, health checks, log rotation, and a reverse proxy. Do not expose port 8787 publicly. Keep `OPENAI_API_KEY` in the VPS secret/environment store, never in the web bundle.
