import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'

const MAX_INPUT_LENGTH = 20_000
const MAX_OUTPUT_LENGTH = 25_000

/** Strip control characters and normalise excessive whitespace. */
function sanitizeText(text: string): string {
  return text
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * POST /api/ai/improve-text
 * Improves grammar, clarity, and professionalism of admin-written text.
 * - Requires admin auth. No database access. API key is server-only.
 * - Input/output sanitized. Does not add facts, dates, names, or numbers.
 */
export async function POST(request: NextRequest) {
  try {
    const decoded = await verifyAdminToken(request)
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiKey = process.env.OPENAI_API_KEY?.trim().replace(/^["']|["']$/g, '')
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI improvement is not configured. Add OPENAI_API_KEY to .env.local.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const raw = typeof body?.text === 'string' ? body.text : ''
    const text = sanitizeText(raw)

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required and cannot be empty after trimming.' },
        { status: 400 }
      )
    }

    if (text.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: `Text must be at most ${MAX_INPUT_LENGTH.toLocaleString()} characters.` },
        { status: 400 }
      )
    }

    const systemPrompt = `You are an editor for a school/academic website. Improve the user's text for grammar, clarity, and professionalism only. Use a formal tone suitable for a school website.

Rules:
- Keep the original meaning exactly the same.
- Do NOT add new facts, dates, names, numbers, or details.
- Do NOT remove facts, dates, names, or numbers that are already in the text.
- Only fix grammar, punctuation, wording clarity, and tone.
- Output only the improved text, with no preamble or explanation.`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        max_tokens: 4096,
        temperature: 0.3,
      }),
    })

    if (!res.ok) {
      let clientMessage = 'AI service error. Please try again later.'
      try {
        const errBody = await res.json().catch(() => ({})) as { error?: { message?: string; code?: string } }
        const msg = errBody?.error?.message ?? ''
        if (res.status === 401) {
          clientMessage = 'Invalid or missing OpenAI API key. Check OPENAI_API_KEY in .env.local.'
        } else if (res.status === 429) {
          clientMessage = 'AI rate limit reached. Please try again in a moment.'
        } else if (msg && !msg.toLowerCase().includes('key') && !msg.toLowerCase().includes('secret')) {
          clientMessage = msg.slice(0, 120)
        }
        console.error('[ai/improve-text] OpenAI API error:', res.status, errBody)
      } catch {
        console.error('[ai/improve-text] OpenAI API error:', res.status, await res.text().catch(() => ''))
      }
      return NextResponse.json(
        { error: clientMessage },
        { status: 502 }
      )
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const content = data?.choices?.[0]?.message?.content ?? ''

    const improved = sanitizeText(content)
    if (improved.length > MAX_OUTPUT_LENGTH) {
      return NextResponse.json({
        improvedText: improved.slice(0, MAX_OUTPUT_LENGTH),
      })
    }

    return NextResponse.json({ improvedText: improved })
  } catch (e) {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
