# AI Sekretarka - Yieldo

AI-powered virtual receptionist for Polish businesses. Automated 24/7 phone answering, appointment scheduling, and customer communication.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features

- 24/7 AI phone receptionist
- Automatic appointment booking (Google Calendar/Booksy)
- SMS confirmations
- Lost revenue calculator
- Contact form integration

## Pages

- `/` - Homepage with module cards
- `/ai-sekretarka` - Main AI Receptionist landing page
- `/kalkulator` - Interactive revenue loss calculator
- `/login` - Login page (currently disabled)

## Email Setup

Contact form sends to **info.yieldo@gmail.com**. Configure email service in `.env.local`:

```env
RESEND_API_KEY=your_key_here
```

See `EMAIL_SETUP.md` for detailed setup instructions (Resend, Gmail, or SendGrid).

## Build & Deploy

```bash
npm run build    # Production build
npm run lint     # Check code quality
```

Deploy to Vercel: Connect your repo and add environment variables in project settings.

## Tech Stack

- Next.js 15.3.5 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Resend for emails

## Documentation

- `EMAIL_SETUP.md` - Email configuration guide
- `PRODUCTION_CHANGES.md` - Production deployment notes
- `CLAUDE.md` - Claude Code configuration (development)

## License

© 2025 Yieldo. All rights reserved.
