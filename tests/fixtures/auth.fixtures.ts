/**
 * Test fixtures for authentication testing
 * Provides reusable test data for various auth scenarios
 */

export const validUsers = {
  standard: {
    email: 'test@example.com',
    password: 'SecurePass123!@#',
    name: 'Test User',
  },
  admin: {
    email: 'admin@example.com',
    password: 'AdminPass123!@#',
    name: 'Admin User',
    role: 'admin',
  },
  premium: {
    email: 'premium@example.com',
    password: 'PremiumPass123!@#',
    name: 'Premium User',
    subscription: 'premium',
  },
};

export const invalidUsers = {
  weakPassword: {
    email: 'weak@example.com',
    password: '123',
    name: 'Weak Password User',
  },
  invalidEmail: {
    email: 'not-an-email',
    password: 'ValidPass123!',
    name: 'Invalid Email User',
  },
  sqlInjection: {
    email: "admin'--",
    password: "' OR '1'='1",
    name: 'SQL Injection Attempt',
  },
  xssAttempt: {
    email: 'xss@example.com',
    password: 'Pass123!',
    name: '<script>alert("XSS")</script>',
  },
  longEmail: {
    email: 'a'.repeat(300) + '@example.com',
    password: 'ValidPass123!',
    name: 'Long Email User',
  },
  emptyFields: {
    email: '',
    password: '',
    name: '',
  },
};

export const sessionTokens = {
  valid: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2MTYyMzkwMjIsImV4cCI6OTk5OTk5OTk5OX0.test',
  expired: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTYiLCJleHAiOjF9.test',
  malformed: 'invalid.token.here',
  tampered: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tampered.signature',
};

export const passwordHashes = {
  // Pre-computed bcrypt hashes for testing (rounds=10)
  'SecurePass123!@#': '$2b$10$abcdefghijklmnopqrstuvwxyz123456789',
  'AdminPass123!@#': '$2b$10$zyxwvutsrqponmlkjihgfedcba987654321',
};

export const rateLimitScenarios = {
  normal: {
    requests: 3,
    interval: 1000,
    shouldSucceed: true,
  },
  burst: {
    requests: 10,
    interval: 100,
    shouldSucceed: false,
  },
  distributed: {
    requests: 5,
    interval: 500,
    shouldSucceed: true,
  },
};

export const csrfTokens = {
  valid: 'csrf-token-123-abc',
  invalid: 'invalid-csrf-token',
  expired: 'expired-csrf-token-xyz',
};

export const mockDatabaseUsers = [
  {
    id: '1',
    email: 'existing@example.com',
    password: passwordHashes['SecurePass123!@#'],
    name: 'Existing User',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    emailVerified: true,
  },
  {
    id: '2',
    email: 'unverified@example.com',
    password: passwordHashes['SecurePass123!@#'],
    name: 'Unverified User',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    emailVerified: false,
  },
];

export const errorMessages = {
  invalidCredentials: 'Invalid email or password',
  emailExists: 'Email already registered',
  weakPassword: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  invalidEmail: 'Invalid email format',
  sessionExpired: 'Session expired. Please log in again.',
  unauthorized: 'Unauthorized access',
  rateLimited: 'Too many requests. Please try again later.',
  csrfInvalid: 'Invalid CSRF token',
};
