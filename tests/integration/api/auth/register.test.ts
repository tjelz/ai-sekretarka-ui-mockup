import { POST } from '@/app/api/auth/register/route'
import { NextRequest } from 'next/server'
import { mockUsers, mockAPIResponses, mockDatabaseErrors } from '../../../fixtures'
import { createMockPool } from '../../../fixtures/database-mock'

// Mock pg Pool
jest.mock('pg', () => ({
  Pool: jest.fn(),
}))

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
  compare: jest.fn(),
}))

describe('POST /api/auth/register', () => {
  let mockPool: any

  beforeEach(() => {
    jest.clearAllMocks()
    mockPool = createMockPool()
    const { Pool } = require('pg')
    Pool.mockImplementation(() => mockPool)
  })

  afterEach(() => {
    mockPool.reset()
  })

  describe('Successful Registration', () => {
    it('should register a new user with valid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.newUser),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.message).toBe('User registered successfully')
      expect(data.user).toHaveProperty('id')
      expect(data.user).toHaveProperty('name', mockUsers.newUser.name)
      expect(data.user).toHaveProperty('email', mockUsers.newUser.email)
      expect(data.user).not.toHaveProperty('password')
    })

    it('should convert email to lowercase', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...mockUsers.newUser,
          email: 'TEST@EXAMPLE.COM',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.user.email).toBe('test@example.com')
    })

    it('should hash the password before storing', async () => {
      const bcrypt = require('bcrypt')
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.newUser),
      })

      await POST(request)

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUsers.newUser.password, 10)
    })
  })

  describe('Validation Errors', () => {
    it('should return 400 when name is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.invalidUsers.missingName),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Missing required fields')
    })

    it('should return 400 when email is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.invalidUsers.missingEmail),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Missing required fields')
    })

    it('should return 400 when password is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.invalidUsers.missingPassword),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Missing required fields')
    })

    it('should return 400 for invalid email format', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.invalidUsers.invalidEmail),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid email format')
    })

    it('should return 400 for password shorter than 8 characters', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.invalidUsers.shortPassword),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Password must be at least 8 characters long')
    })
  })

  describe('Duplicate User Errors', () => {
    it('should return 409 when email already exists', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Another User',
          email: mockUsers.validUser.email,
          password: 'Password123!',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.error).toBe('User with this email already exists')
    })

    it('should handle database duplicate key error', async () => {
      mockPool.setFailure(mockDatabaseErrors.duplicateKey)

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.newUser),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.error).toBe('User with this email already exists')
    })
  })

  describe('Database Errors', () => {
    it('should return 503 for connection refused error', async () => {
      mockPool.setFailure(mockDatabaseErrors.connectionRefused)

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.newUser),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.error).toContain('Database connection error')
    })

    it('should return 503 for timeout error', async () => {
      mockPool.setFailure(mockDatabaseErrors.timeout)

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.newUser),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.error).toContain('Database connection error')
    })

    it('should return 500 for generic database errors', async () => {
      mockPool.setFailure(new Error('Unknown database error'))

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(mockUsers.newUser),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('An error occurred during registration')
    })
  })

  describe('Malformed Request', () => {
    it('should handle invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: 'invalid-json',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBeDefined()
    })

    it('should handle empty request body', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({}),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Missing required fields')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long names', async () => {
      const longName = 'A'.repeat(255)
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: longName,
          email: 'test@example.com',
          password: 'Password123!',
        }),
      })

      const response = await POST(request)
      expect(response.status).toBeLessThan(500)
    })

    it('should handle special characters in name', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: "O'Connor-Smith Jr.",
          email: 'oconnor@example.com',
          password: 'Password123!',
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(201)
    })

    it('should handle unicode characters in name', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: 'François Müller 中文',
          email: 'unicode@example.com',
          password: 'Password123!',
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(201)
    })
  })
})
