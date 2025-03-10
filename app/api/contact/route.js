import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { name, email, message } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'fuadturkish@gmail.com',
      subject: `New Message from ${name}`,
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
