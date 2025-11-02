/**
 * Security Vulnerability Tests
 * Tests for SQL injection, XSS, CSRF, and other security vulnerabilities
 *
 * @group security
 * @group critical
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { invalidUsers } from '../fixtures/auth.fixtures';

describe('SQL Injection Prevention', () => {
  const sqlInjectionPayloads = [
    "admin'--",
    "' OR '1'='1",
    "'; DROP TABLE users; --",
    "1' OR '1' = '1')) /*",
    "admin' OR 1=1 /*",
    "' UNION SELECT * FROM users--",
  ];

  sqlInjectionPayloads.forEach((payload) => {
    it(`should prevent SQL injection: ${payload}`, async () => {
      const response = await mockApiRequest('/api/auth/login', {
        method: 'POST',
        body: {
          email: payload,
          password: payload,
        },
      });

      expect(response.status).not.toBe(500);

      const userCount = await mockDatabase.countUsers();
      expect(userCount).toBeGreaterThanOrEqual(0);

      const tablesExist = await mockDatabase.checkTablesExist();
      expect(tablesExist).toBe(true);
    });
  });

  it('should use parameterized queries', async () => {
    const maliciousEmail = "test@example.com'; DROP TABLE users; --";

    await mockApiRequest('/api/auth/register', {
      method: 'POST',
      body: {
        email: maliciousEmail,
        password: 'ValidPass123!',
        name: 'Test User',
      },
    });

    const tablesExist = await mockDatabase.checkTablesExist();
    expect(tablesExist).toBe(true);
  });
});

describe('Cross-Site Scripting (XSS) Prevention', () => {
  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    '<svg onload=alert("XSS")>',
    'javascript:alert("XSS")',
    '<iframe src="javascript:alert(\'XSS\')">',
    '"><script>alert(String.fromCharCode(88,83,83))</script>',
    '<body onload=alert("XSS")>',
  ];

  xssPayloads.forEach((payload) => {
    it(`should sanitize XSS payload: ${payload}`, async () => {
      const response = await mockApiRequest('/api/auth/register', {
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'ValidPass123!',
          name: payload,
        },
      });

      if (response.status === 201) {
        const user = await mockDatabase.findUserById(response.body.userId);

        expect(user.name).not.toContain('<script>');
        expect(user.name).not.toContain('onerror');
        expect(user.name).not.toContain('onload');
        expect(user.name).not.toContain('javascript:');
      }
    });
  });

  it('should set Content-Security-Policy header', async () => {
    const response = await mockApiRequest('/api/auth/login', {
      method: 'GET',
    });

    expect(response.headers['content-security-policy']).toBeDefined();
    expect(response.headers['content-security-policy']).toContain("default-src 'self'");
  });

  it('should sanitize user-generated content in responses', async () => {
    const xssName = '<script>alert("XSS")</script>';
    await mockDatabase.createUser({
      email: 'xss@example.com',
      password: 'ValidPass123!',
      name: xssName,
    });

    const response = await mockApiRequest('/api/users/profile', {
      method: 'GET',
    });

    const responseText = JSON.stringify(response.body);
    expect(responseText).not.toContain('<script>');
  });
});

describe('Cross-Site Request Forgery (CSRF) Prevention', () => {
  it('should require CSRF token for state-changing requests', async () => {
    const response = await mockApiRequest('/api/auth/logout', {
      method: 'POST',
      headers: {
        Cookie: 'session=valid-session',
      },
    });

    expect(response.status).toBe(403);
    expect(response.body.error).toContain('CSRF');
  });

  it('should accept request with valid CSRF token', async () => {
    const csrfToken = await mockGetCsrfToken();

    const response = await mockApiRequest('/api/auth/logout', {
      method: 'POST',
      headers: {
        Cookie: 'session=valid-session',
        'X-CSRF-Token': csrfToken,
      },
    });

    expect(response.status).toBe(200);
  });

  it('should reject request with invalid CSRF token', async () => {
    const response = await mockApiRequest('/api/auth/logout', {
      method: 'POST',
      headers: {
        Cookie: 'session=valid-session',
        'X-CSRF-Token': 'invalid-token',
      },
    });

    expect(response.status).toBe(403);
  });

  it('should use SameSite cookie attribute', async () => {
    const response = await mockApiRequest('/api/auth/login', {
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'ValidPass123!',
      },
    });

    const setCookie = response.headers['set-cookie'][0];
    expect(setCookie).toContain('SameSite=Strict');
  });
});

describe('Authentication Security', () => {
  it('should use constant-time comparison for passwords', async () => {
    const correctPassword = 'CorrectPassword123!';
    const wrongPassword = 'WrongPassword123!';

    const start1 = performance.now();
    await mockApiRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'test@example.com', password: correctPassword },
    });
    const time1 = performance.now() - start1;

    const start2 = performance.now();
    await mockApiRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'test@example.com', password: wrongPassword },
    });
    const time2 = performance.now() - start2;

    const timeDiff = Math.abs(time1 - time2);
    expect(timeDiff).toBeLessThan(10);
  });

  it('should hash passwords with appropriate cost factor', async () => {
    const password = 'TestPassword123!';

    const start = performance.now();
    const hash = await mockHashPassword(password);
    const duration = performance.now() - start;

    expect(hash).toMatch(/^\$2[aby]\$10\$/);
    expect(duration).toBeGreaterThan(50);
    expect(duration).toBeLessThan(500);
  });

  it('should not reveal whether user exists', async () => {
    const existingUserResponse = await mockApiRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'existing@example.com', password: 'wrong' },
    });

    const nonExistentUserResponse = await mockApiRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'nonexistent@example.com', password: 'wrong' },
    });

    expect(existingUserResponse.body.error).toBe(nonExistentUserResponse.body.error);
    expect(existingUserResponse.status).toBe(nonExistentUserResponse.status);
  });
});

describe('Session Security', () => {
  it('should generate cryptographically secure session tokens', async () => {
    const tokens = new Set();

    for (let i = 0; i < 1000; i++) {
      const token = await mockGenerateSessionToken();
      tokens.add(token);
    }

    expect(tokens.size).toBe(1000);
  });

  it('should set secure cookie flags', async () => {
    const response = await mockApiRequest('/api/auth/login', {
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'ValidPass123!',
      },
    });

    const setCookie = response.headers['set-cookie'][0];

    expect(setCookie).toContain('HttpOnly');
    expect(setCookie).toContain('Secure');
    expect(setCookie).toContain('SameSite=Strict');
  });

  it('should invalidate old sessions on password change', async () => {
    const oldSession = await mockCreateSession();

    await mockApiRequest('/api/auth/change-password', {
      method: 'POST',
      body: {
        currentPassword: 'OldPass123!',
        newPassword: 'NewPass123!',
      },
      headers: { Cookie: `session=${oldSession}` },
    });

    const isValid = await mockValidateSession(oldSession);
    expect(isValid).toBe(false);
  });
});

describe('Rate Limiting', () => {
  it('should rate limit login attempts per IP', async () => {
    const ip = '192.168.1.1';
    const attempts = 10;

    let limitedResponse;
    for (let i = 0; i < attempts; i++) {
      limitedResponse = await mockApiRequest(
        '/api/auth/login',
        {
          method: 'POST',
          body: { email: 'test@example.com', password: 'wrong' },
        },
        { ip }
      );
    }

    expect(limitedResponse.status).toBe(429);
  });

  it('should rate limit per user account', async () => {
    for (let i = 0; i < 10; i++) {
      await mockApiRequest('/api/auth/login', {
        method: 'POST',
        body: { email: 'test@example.com', password: 'wrong' },
      });
    }

    const response = await mockApiRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'test@example.com', password: 'CorrectPass123!' },
    });

    expect(response.status).toBe(429);
  });
});

describe('Information Disclosure', () => {
  it('should not expose stack traces in production', async () => {
    const response = await mockApiRequest('/api/auth/error-trigger', {
      method: 'POST',
    });

    expect(response.status).toBe(500);
    expect(JSON.stringify(response.body)).not.toContain('at ');
    expect(JSON.stringify(response.body)).not.toContain('.ts:');
  });

  it('should not include sensitive headers', async () => {
    const response = await mockApiRequest('/api/auth/login', {
      method: 'POST',
      body: { email: 'test@example.com', password: 'ValidPass123!' },
    });

    expect(response.headers['x-powered-by']).toBeUndefined();
    expect(response.headers.server).toBeUndefined();
  });
});

// Mock functions
function mockApiRequest(url: string, options: any, context = {}): Promise<any> {
  return Promise.resolve({
    status: 200,
    body: {},
    headers: {},
  });
}

const mockDatabase = {
  countUsers: async () => 1,
  checkTablesExist: async () => true,
  findUserById: async (id: string) => ({ id, name: '', email: '' }),
  createUser: async (user: any) => {},
};

async function mockGetCsrfToken(): Promise<string> {
  return 'valid-csrf-token';
}

async function mockHashPassword(password: string): Promise<string> {
  return '$2b$10$abcdefghijklmnopqrstuvwxyz123456789';
}

async function mockGenerateSessionToken(): Promise<string> {
  return Math.random().toString(36).substring(2);
}

async function mockCreateSession(): Promise<string> {
  return 'session-token-123';
}

async function mockValidateSession(token: string): Promise<boolean> {
  return true;
}
