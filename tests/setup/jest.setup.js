// Jest setup for authentication testing
require('@testing-library/jest-dom');

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
process.env.JWT_SECRET = 'test-secret-key-for-testing-only';
process.env.SESSION_SECRET = 'test-session-secret-for-testing';
process.env.POSTGRES_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.NEXTAUTH_SECRET = 'test-secret-key-for-testing-only';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.RESEND_API_KEY = 'test-resend-api-key';

// Global test timeout
jest.setTimeout(10000);

// Mock Next.js headers and cookies
global.mockHeaders = {};
global.mockCookies = {};

beforeEach(() => {
  global.mockHeaders = {};
  global.mockCookies = {};
});

afterEach(() => {
  jest.clearAllMocks();
});

// Custom matchers
expect.extend({
  toHaveSecureHeaders(response) {
    const hasSecurityHeaders =
      response.headers?.['x-content-type-options'] === 'nosniff' &&
      response.headers?.['x-frame-options'] === 'DENY';

    return {
      pass: hasSecurityHeaders,
      message: () =>
        hasSecurityHeaders
          ? 'Expected response not to have secure headers'
          : 'Expected response to have secure headers (x-content-type-options, x-frame-options)',
    };
  },
});
