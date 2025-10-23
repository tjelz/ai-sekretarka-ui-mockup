import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validate input
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email content
    const emailContent = `
Nowe zgłoszenie z formularza kontaktowego AI Sekretarka

Dane kontaktowe:
- Imię: ${name}
- Email: ${email}
- Telefon: ${phone}

---
Wysłane z: Yieldo.ai
Data: ${new Date().toLocaleString('pl-PL')}
    `.trim();

    // Send email using Resend
    await resend.emails.send({
      from: 'Yieldo.ai <onboarding@resend.dev>',
      to: 'info.yieldo@gmail.com',
      subject: `Nowe zgłoszenie: ${name}`,
      text: emailContent,
    });

    // Log submission for debugging
    console.log('Contact form submission sent via Resend:', { name, email, phone });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Zgłoszenie zostało wysłane. Skontaktujemy się wkrótce!',
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
