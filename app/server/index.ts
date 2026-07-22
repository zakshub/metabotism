import 'dotenv/config'
import http from 'node:http'
import OpenAI from 'openai'
import { z } from 'zod'

const port = Number(process.env.PORT || 8787)
const model = process.env.OPENAI_MODEL || 'gpt-5'
const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

const chatRequest = z.object({
  message: z.string().trim().min(1).max(2000),
  language: z.enum(['en', 'ur']).default('en'),
  profile: z.object({ name: z.string().trim().min(1).max(80), age: z.string().trim().max(3) }),
  history: z.array(z.object({ role: z.enum(['user', 'assistant']), text: z.string().max(2000) })).max(20).default([]),
})

const approvedPlan = `
MetaBotism is a private adherence and wellness coach for the user's approved plan.
The plan emphasizes regular meals, fruits, salad, yoghurt or milk, walking, sleep, water,
heat precautions, safe substitutions, and comparable follow-up test preparation.
It does not promise fertility or semen outcomes. Raw semen and post-preparation results
must not be compared as the same metric. Nitrix or any supplement must not be restarted,
dosed, prescribed, or stopped by the assistant.
`

const systemPrompt = (language: 'en' | 'ur', profile: { name: string; age: string }) => `
You are MetaBotism, a concise, warm, firm adherence coach for ${profile.name}, age ${profile.age}.
Reply in ${language === 'ur' ? 'clear Urdu using normal readable Naskh-like script' : 'plain English'}.
Use exactly this response shape: Action, Why, Limitation, Alternatives.
Keep it short and actionable. Never diagnose, prescribe, change medicine, recommend tobacco,
promise fertility improvement, or override urgent medical help. For sudden severe testicular
pain/swelling, high fever with severe urinary symptoms, blood in urine, chest pain, fainting,
severe palpitations, breathing difficulty, serious supplement reaction, or self-harm crisis,
stop routine coaching and recommend appropriate medical help.
Approved plan:
${approvedPlan}
`

function json(res: http.ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': 'http://127.0.0.1:5173' })
  res.end(JSON.stringify(body))
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => { let body = ''; req.on('data', (chunk) => { body += chunk; if (body.length > 100_000) reject(new Error('request too large')) }); req.on('end', () => resolve(body)); req.on('error', reject) })
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') { res.writeHead(204, { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST,GET,OPTIONS', 'access-control-allow-headers': 'content-type' }); return res.end() }
  if (req.method === 'GET' && req.url === '/api/health') return json(res, 200, { ok: true, aiConfigured: Boolean(client), model })
  if (req.method !== 'POST' || req.url !== '/api/chat') return json(res, 404, { error: 'not_found' })
  try {
    const input = chatRequest.parse(JSON.parse(await readBody(req)))
    if (!client) return json(res, 503, { error: 'ai_not_configured', message: 'Set OPENAI_API_KEY in the server environment.' })
    const response = await client.responses.create({ model, store: false, input: [{ role: 'system', content: systemPrompt(input.language, input.profile) }, ...input.history.map((item) => ({ role: item.role, content: item.text })), { role: 'user', content: input.message }] })
    return json(res, 200, { reply: response.output_text, model })
  } catch (error) {
    if (error instanceof z.ZodError) return json(res, 400, { error: 'invalid_request', message: 'The chat request is invalid.' })

    const apiError = error as { status?: number; message?: string }
    const status = apiError.status ?? 500
    console.error(`[chat] OpenAI request failed (${status}): ${apiError.message || 'unknown error'}`)

    if (status === 401 || status === 403) return json(res, 502, { error: 'ai_auth_failed', message: 'The server API key was rejected. Check OPENAI_API_KEY.' })
    if (status === 429) return json(res, 429, { error: 'ai_rate_limited', message: 'The AI service is rate-limited or out of quota. Check billing and usage.' })
    if (status === 400) return json(res, 502, { error: 'ai_request_rejected', message: 'The AI service rejected this request. Check OPENAI_MODEL and the server configuration.' })
    return json(res, 502, { error: 'ai_unavailable', message: 'The AI service is temporarily unavailable. Check the API server terminal.' })
  }
})

server.listen(port, '127.0.0.1', () => console.log(`MetaBotism API listening on http://127.0.0.1:${port}`))
