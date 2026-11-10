import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/middleware'
import { enforceRateLimit } from '@/lib/security/rateLimit'
import { parseJsonBody } from '@/lib/utils/http'
import { improveTextSchema, MAX_AI_INPUT_LENGTH } from '@/lib/validation/ai'

const MAX_INPUT_LENGTH = MAX_AI_INPUT_LENGTH
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
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response

    // Each call costs money: cap usage per admin IP
    const limited = enforceRateLimit(request, 'ai-improve', { limit: 30, windowMs: 10 * 60 * 1000 })
    if (limited) return limited

    const apiKey = process.env.OPENAI_API_KEY?.trim().replace(/^["']|["']$/g, '')
    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI improvement is not configured.' },
        { status: 503 }
      )
    }

    const body = await parseJsonBody(request, improveTextSchema)
    if (!body.ok) return body.response
    const text = sanitizeText(body.data.text)

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
      // Upstream error bodies are logged, never forwarded to the client
      const clientMessage =
        res.status === 429
          ? 'AI rate limit reached. Please try again in a moment.'
          : 'AI service error. Please try again later.'
      console.error('[ai/improve-text] OpenAI API error:', res.status, await res.text().catch(() => ''))
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
    console.error('[ai/improve-text] unexpected error:', e)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
