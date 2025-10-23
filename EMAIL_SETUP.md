# Email Setup Guide

The contact form is configured to send emails to **info.yieldo@gmail.com**.

## ✅ Current Status: CONFIGURED

The API endpoint is set up with **Resend** and ready to send emails!

- ✅ Resend package installed
- ✅ API key configured in `.env.local`
- ✅ Email endpoint: `/api/contact`
- ✅ Destination: info.yieldo@gmail.com

## Quick Setup Options

### Option 1: Resend (Recommended - Easiest)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Install the package:
   ```bash
   npm install resend
   ```
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
5. Uncomment the Resend code in `/src/app/api/contact/route.ts` (lines ~25-31)

### Option 2: Gmail with Nodemailer

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Install nodemailer:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```
4. Add to `.env.local`:
   ```
   GMAIL_USER=info.yieldo@gmail.com
   GMAIL_APP_PASSWORD=your_app_password_here
   ```
5. Uncomment the Nodemailer code in `/src/app/api/contact/route.ts` (lines ~47-60)

### Option 3: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Install the package:
   ```bash
   npm install @sendgrid/mail
   ```
4. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=your_api_key_here
   ```
5. Uncomment the SendGrid code in `/src/app/api/contact/route.ts` (lines ~33-42)

## Testing

For development, the form currently logs submissions to the console. Check your terminal/Vercel logs to see the form data and email content that would be sent.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Choose one based on your email service:

# For Resend:
RESEND_API_KEY=your_key_here

# For Gmail:
GMAIL_USER=info.yieldo@gmail.com
GMAIL_APP_PASSWORD=your_app_password_here

# For SendGrid:
SENDGRID_API_KEY=your_key_here
```

## Vercel Deployment

When deploying to Vercel, add the Resend API key:

1. Go to your Vercel project
2. Navigate to: **Settings > Environment Variables**
3. Add variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_XSAFF12A_4oep1VNujaKtJhyBXEfdgJGF`
   - **Environment**: Production, Preview, Development (select all)
4. Click "Save"
5. Redeploy your application

The email functionality will work immediately after deployment!

## Troubleshooting

- Make sure environment variables are set correctly
- Check Vercel logs for any errors
- Verify your email service API key is valid
- For Gmail, ensure App Password (not regular password) is used
