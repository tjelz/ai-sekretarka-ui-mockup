import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  })),
}))

describe('POST /api/contact', () => {
  const validContactData = {
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    phone: '+48123456789',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.RESEND_API_KEY = 'test-api-key'
  })

  describe('Successful Submission', () => {
    it('should accept valid contact form submission', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validContactData),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('Zgłoszenie zostało wysłane')
    })

    it('should send email via Resend when configured', async () => {
      const { Resend } = require('resend')
      const mockResend = new Resend()

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validContactData),
      })

      await POST(request)

      expect(mockResend.emails.send).toHaveBeenCalledWith(
        expect.objectContaining({
          from: expect.any(String),
          to: 'info.yieldo@gmail.com',
          subject: expect.stringContaining(validContactData.name),
          text: expect.stringContaining(validContactData.email),
        })
      )
    })

    it('should handle submission when Resend is not configured', async () => {
      delete process.env.RESEND_API_KEY

      // Clear the module cache to reinitialize without API key
      jest.resetModules()
      const { POST } = require('@/app/api/contact/route')

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validContactData),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })

  describe('Validation Errors', () => {
    it('should return 400 when name is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          email: validContactData.email,
          phone: validContactData.phone,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    it('should return 400 when email is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: validContactData.name,
          phone: validContactData.phone,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    it('should return 400 when phone is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: validContactData.name,
          email: validContactData.email,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })

    it('should handle empty strings as missing fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: '',
          email: validContactData.email,
          phone: validContactData.phone,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
    })
  })

  describe('Email Content', () => {
    it('should include all contact details in email', async () => {
      const { Resend } = require('resend')
      const mockResend = new Resend()

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validContactData),
      })

      await POST(request)

      const emailCall = mockResend.emails.send.mock.calls[0][0]
      expect(emailCall.text).toContain(validContactData.name)
      expect(emailCall.text).toContain(validContactData.email)
      expect(emailCall.text).toContain(validContactData.phone)
    })

    it('should include timestamp in email', async () => {
      const { Resend } = require('resend')
      const mockResend = new Resend()

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validContactData),
      })

      await POST(request)

      const emailCall = mockResend.emails.send.mock.calls[0][0]
      expect(emailCall.text).toContain('Data:')
    })
  })

  describe('Error Handling', () => {
    it('should return 500 when email sending fails', async () => {
      const { Resend } = require('resend')
      const mockResend = new Resend()
      mockResend.emails.send.mockRejectedValueOnce(new Error('Email service error'))

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validContactData),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })

    it('should handle invalid JSON gracefully', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: 'invalid-json',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })

  describe('Edge Cases', () => {
    it('should handle special characters in name', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...validContactData,
          name: "O'Brien-Smith <script>alert('xss')</script>",
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should handle international phone numbers', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          ...validContactData,
          phone: '+1 (555) 123-4567',
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should handle very long input', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'A'.repeat(1000),
          email: 'test@example.com',
          phone: '123456789',
        }),
      })

      const response = await POST(request)
      expect(response.status).toBeLessThan(500)
    })
  })
})
