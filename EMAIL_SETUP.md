# Email Configuration

Contact form sends to **info.yieldo@gmail.com** via API endpoint `/api/contact`.

## Status: ✅ CONFIGURED (Resend)

## Setup Options

### Resend (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to `.env.local`: `RESEND_API_KEY=your_key`
4. Deploy - emails work immediately

### Gmail Alternative
1. Enable 2FA on Gmail
2. Generate App Password: [Google Account](https://myaccount.google.com/apppasswords)
3. Add to `.env.local`:
   ```env
   GMAIL_USER=info.yieldo@gmail.com
   GMAIL_APP_PASSWORD=your_password
   ```

### SendGrid Alternative
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Add to `.env.local`: `SENDGRID_API_KEY=your_key`

## Vercel Deployment

Add environment variable in Vercel project settings:
- Name: `RESEND_API_KEY`
- Value: Your API key
- Environments: All (Production, Preview, Development)
