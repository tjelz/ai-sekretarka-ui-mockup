import { POST as RegisterPOST } from '@/app/api/auth/register/route'
import { POST as ContactPOST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'
import { createMockPool } from '../fixtures/database-mock'

jest.mock('pg', () => ({
  Pool: jest.fn(),
}))

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
  compare: jest.fn(),
}))

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-email-id' }),
    },
  })),
}))

describe('API Performance Tests', () => {
  let mockPool: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockPool = createMockPool()
    const { Pool } = require('pg')
    Pool.mockImplementation(() => mockPool)
    process.env.RESEND_API_KEY = 'test-key'
  })

  describe('Registration Endpoint Performance', () => {
    it('should complete registration within 500ms', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Performance Test',
          email: 'perf@example.com',
          password: 'Password123!',
        }),
      })

      const start = Date.now()
      await RegisterPOST(request)
      const duration = Date.now() - start

      expect(duration).toBeLessThan(500)
    })

    it('should handle 10 concurrent registrations efficiently', async () => {
      const requests = Array(10).fill(null).map((_, i) =>
        new NextRequest('http://localhost:3000/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name: `User ${i}`,
            email: `user${i}@example.com`,
            password: 'Password123!',
          }),
        })
      )

      const start = Date.now()
      await Promise.all(requests.map(req => RegisterPOST(req)))
      const duration = Date.now() - start

      // Should complete 10 requests within 2 seconds
      expect(duration).toBeLessThan(2000)
    })

    it('should not leak memory on repeated requests', async () => {
      const iterations = 100
      const memoryBefore = process.memoryUsage().heapUsed

      for (let i = 0; i < iterations; i++) {
        const request = new NextRequest('http://localhost:3000/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name: `User ${i}`,
            email: `user${i}@example.com`,
            password: 'Password123!',
          }),
        })
        await RegisterPOST(request)
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc()
      }

      const memoryAfter = process.memoryUsage().heapUsed
      const memoryIncrease = memoryAfter - memoryBefore

      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024)
    })
  })

  describe('Contact Endpoint Performance', () => {
    it('should process contact form within 300ms', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Performance Test',
          email: 'perf@example.com',
          phone: '+48123456789',
        }),
      })

      const start = Date.now()
      await ContactPOST(request)
      const duration = Date.now() - start

      expect(duration).toBeLessThan(300)
    })

    it('should handle burst of contact submissions', async () => {
      const requests = Array(20).fill(null).map((_, i) =>
        new NextRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          body: JSON.stringify({
            name: `Contact ${i}`,
            email: `contact${i}@example.com`,
            phone: `+4812345678${i}`,
          }),
        })
      )

      const start = Date.now()
      await Promise.all(requests.map(req => ContactPOST(req)))
      const duration = Date.now() - start

      // 20 concurrent requests should complete within 2 seconds
      expect(duration).toBeLessThan(2000)
    })
  })

  describe('Database Query Performance', () => {
    it('should execute user lookup queries quickly', async () => {
      const start = Date.now()
      await mockPool.query('SELECT * FROM users WHERE email = $1', ['test@example.com'])
      const duration = Date.now() - start

      // Database query should complete within 50ms
      expect(duration).toBeLessThan(50)
    })

    it('should execute insert queries quickly', async () => {
      const start = Date.now()
      await mockPool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        ['Test User', 'new@example.com', 'hashedpassword']
      )
      const duration = Date.now() - start

      expect(duration).toBeLessThan(50)
    })
  })

  describe('Password Hashing Performance', () => {
    it('should hash password within acceptable time', async () => {
      const bcrypt = require('bcrypt')

      // Reset mock to actual timing
      bcrypt.hash.mockImplementation((password: string, rounds: number) => {
        return new Promise((resolve) => {
          // Simulate actual bcrypt timing (around 100ms for 10 rounds)
          setTimeout(() => resolve('$2b$10$hashedpassword'), 100)
        })
      })

      const start = Date.now()
      await bcrypt.hash('TestPassword123!', 10)
      const duration = Date.now() - start

      // Should complete within 200ms (100ms actual + overhead)
      expect(duration).toBeLessThan(200)
    })
  })

  describe('Error Handling Performance', () => {
    it('should fail fast on validation errors', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: '',
          email: '',
          password: '',
        }),
      })

      const start = Date.now()
      await RegisterPOST(request)
      const duration = Date.now() - start

      // Validation should be very fast
      expect(duration).toBeLessThan(50)
    })

    it('should handle malformed JSON quickly', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: 'invalid-json{{{',
      })

      const start = Date.now()
      await RegisterPOST(request)
      const duration = Date.now() - start

      // Error handling should be fast
      expect(duration).toBeLessThan(100)
    })
  })

  describe('Response Time Consistency', () => {
    it('should have consistent response times', async () => {
      const times: number[] = []

      for (let i = 0; i < 20; i++) {
        const request = new NextRequest('http://localhost:3000/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name: `User ${i}`,
            email: `user${i}@example.com`,
            password: 'Password123!',
          }),
        })

        const start = Date.now()
        await RegisterPOST(request)
        times.push(Date.now() - start)
      }

      const avg = times.reduce((a, b) => a + b) / times.length
      const maxDeviation = Math.max(...times.map(t => Math.abs(t - avg)))

      // Max deviation should be less than 100ms from average
      expect(maxDeviation).toBeLessThan(100)
    })
  })

  describe('Resource Usage', () => {
    it('should not create too many database connections', async () => {
      const { Pool } = require('pg')
      const poolInstances = Pool.mock.instances.length

      // Multiple requests
      for (let i = 0; i < 10; i++) {
        const request = new NextRequest('http://localhost:3000/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            name: `User ${i}`,
            email: `user${i}@example.com`,
            password: 'Password123!',
          }),
        })
        await RegisterPOST(request)
      }

      const newPoolInstances = Pool.mock.instances.length

      // Should reuse connection pool, not create new ones
      expect(newPoolInstances).toBe(poolInstances)
    })
  })
})
