# MetaBotism

Private, English-first responsive adherence dashboard with optional Urdu and content-only Nastaliq reading mode.

## Product shape

The first delivery is a web dashboard. Android/Capacitor is kept as an optional later wrapper, not a dependency. The browser client never receives the OpenAI API key.

```text
React/Vite dashboard -> /api/chat -> TypeScript API -> OpenAI Responses API
                                      -> approved plan + safety contract
```

## Local run

```cmd
npm install
copy .env.example .env
rem Edit .env and add OPENAI_API_KEY

start "MetaBotism API" cmd /k npm.cmd run dev:api
start "MetaBotism Web" cmd /k npm.cmd run dev
```

Open `http://127.0.0.1:5173/`. Without an API key, the UI still works locally but chat returns a clear configuration error.

## Verification

```cmd
npm run build
npm run build:api
```

## Security rules

- Never put `OPENAI_API_KEY` in React, Vite variables, Android code, Git, logs, or client errors.
- Keep clinical truth in versioned deterministic rules; the model explains and coaches.
- Do not send raw medical files to the model unless a separately consented feature requires it.
- Add authentication, rate limiting, persistent audit controls, and encrypted storage before VPS production.

## Deployment direction

Deploy the API and web build together behind HTTPS on an Ubuntu VPS. Add PostgreSQL for accounts, consent, plan versions, chat metadata, and audit records. WhatsApp remains a separate channel adapter that calls the same API.
