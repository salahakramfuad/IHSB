import nodemailer from 'nodemailer'

// Input validation helper
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitize string input
function sanitizeString(str, maxLength) {
  if (typeof str !== 'string') return ''
  return str.trim().substring(0, maxLength).replace(/[\r\n]/g, ' ')
}

export async function POST(req) {
  try {
    const body = await req.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, message' }),
        { status: 400 }
      )
    }

    // Validate and sanitize inputs
    const name = sanitizeString(body.name, 200)
    const email = sanitizeString(body.email, 200)
    const message = sanitizeString(body.message, 5000)

    // Validate email format
    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400 }
      )
    }

    // Validate input lengths
    if (name.length < 2) {
      return new Response(
        JSON.stringify({ error: 'Name must be at least 2 characters' }),
        { status: 400 }
      )
    }

    if (message.length < 10) {
      return new Response(
        JSON.stringify({ error: 'Message must be at least 10 characters' }),
        { status: 400 }
      )
    }

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing')
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Sanitize email subject to prevent header injection
    const safeSubject = `New Message from ${name}`.replace(/[\r\n]/g, ' ')

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email, // Use replyTo instead of from to prevent email spoofing
      to: 'fuadturkish@gmail.com',
      subject: safeSubject,
      text: `From: ${name} (${email})\n\n${message}`
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting us',
      text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nInternational Hope School Bangladesh`
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500
    })
  }
}
