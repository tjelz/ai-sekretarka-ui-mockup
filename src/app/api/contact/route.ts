import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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
Wysłane z: Yieldo
Data: ${new Date().toLocaleString('pl-PL')}
    `.trim();

    // Send email using Resend (if configured)
    if (resend) {
      await resend.emails.send({
        from: 'Yieldo <onboarding@resend.dev>',
        to: 'info.yieldo@gmail.com',
        subject: `Nowe zgłoszenie: ${name}`,
        text: emailContent,
      });
      console.log('Contact form submission sent via Resend:', { name, email, phone });
    } else {
      // Log submission for debugging when Resend is not configured
      console.log('Contact form submission (Resend not configured):', { name, email, phone });
    }

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
