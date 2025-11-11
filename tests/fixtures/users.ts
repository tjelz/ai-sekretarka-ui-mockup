export const mockUsers = {
  validUser: {
    id: 'test-user-123',
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    password: 'SecurePassword123!',
    hashedPassword: '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ', // Mock bcrypt hash
  },
  adminUser: {
    id: 'admin-user-456',
    name: 'Admin User',
    email: 'admin@yieldo.pl',
    password: 'AdminPass123!',
    hashedPassword: '$2b$10$zyxwvutsrqponmlkjihgfedcba0987654321ZYXWVUTSRQ',
  },
  newUser: {
    name: 'Nowy Użytkownik',
    email: 'nowy@example.com',
    password: 'NoweHaslo123!',
  },
  invalidUsers: {
    missingName: {
      email: 'test@example.com',
      password: 'Password123!',
    },
    missingEmail: {
      name: 'Test User',
      password: 'Password123!',
    },
    missingPassword: {
      name: 'Test User',
      email: 'test@example.com',
    },
    invalidEmail: {
      name: 'Test User',
      email: 'invalid-email',
      password: 'Password123!',
    },
    shortPassword: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'short',
    },
  },
}

export const mockSessions = {
  validSession: {
    user: {
      id: 'test-user-123',
      name: 'Jan Kowalski',
      email: 'jan.kowalski@example.com',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  expiredSession: {
    user: {
      id: 'test-user-123',
      name: 'Jan Kowalski',
      email: 'jan.kowalski@example.com',
    },
    expires: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
}

export const mockJWTTokens = {
  validToken: {
    id: 'test-user-123',
    email: 'jan.kowalski@example.com',
    name: 'Jan Kowalski',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  },
  expiredToken: {
    id: 'test-user-123',
    email: 'jan.kowalski@example.com',
    name: 'Jan Kowalski',
    iat: Math.floor(Date.now() / 1000) - 48 * 60 * 60,
    exp: Math.floor(Date.now() / 1000) - 24 * 60 * 60,
  },
}
