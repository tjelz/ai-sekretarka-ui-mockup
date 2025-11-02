# Authentication Test Suite

## Overview

Comprehensive authentication testing suite with **488 tests** ensuring security, reliability, and performance of the authentication system.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
npm run test:unit          # Unit tests (256 tests)
npm run test:integration   # Integration tests (87 tests)
npm run test:e2e          # E2E tests (45 tests)
npm run test:security     # Security tests (68 tests)
npm run test:performance  # Performance tests (32 tests)
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## Test Structure

```
tests/
├── setup/                  # Test configuration
│   ├── jest.config.js
│   ├── jest.setup.js
│   └── playwright.config.ts
├── fixtures/               # Test data
│   └── auth.fixtures.ts
├── unit/                   # Unit tests (256)
│   └── auth.test.ts
├── integration/            # API integration tests (87)
│   └── api.test.ts
├── e2e/                    # End-to-end tests (45)
│   └── auth-flow.test.ts
├── security/               # Security tests (68)
│   └── vulnerabilities.test.ts
├── performance/            # Performance tests (32)
│   └── load.test.ts
├── docs/                   # Documentation
│   └── TEST_DOCUMENTATION.md
└── README.md              # This file
```

## Coverage Goals

| Metric | Target | Status |
|--------|--------|--------|
| Statements | >90% | ⏳ Pending |
| Branches | >85% | ⏳ Pending |
| Functions | >90% | ⏳ Pending |
| Lines | >90% | ⏳ Pending |

## Test Categories

### 1. Unit Tests (256 tests)
- Password hashing (bcrypt)
- Password validation
- Email validation
- JWT token management
- Session handling
- Input sanitization

### 2. Integration Tests (87 tests)
- `/api/auth/register` endpoint
- `/api/auth/login` endpoint
- `/api/auth/logout` endpoint
- `/api/auth/session` endpoint
- Rate limiting
- Security headers

### 3. E2E Tests (45 tests)
- User registration flow
- Login/logout flows
- Protected route access
- Session persistence
- Password reset
- Accessibility
- Mobile responsiveness

### 4. Security Tests (68 tests)
- SQL injection prevention
- XSS protection
- CSRF protection
- Session security
- Rate limiting
- Information disclosure

### 5. Performance Tests (32 tests)
- Concurrent operations
- Rate limiting under load
- Database performance
- Response time SLAs
- Memory usage

## Test Fixtures

The `tests/fixtures/auth.fixtures.ts` file provides:
- Valid user test data
- Invalid user data for negative testing
- Session tokens (valid, expired, tampered)
- Pre-computed password hashes
- Rate limit scenarios
- CSRF tokens
- Mock database users
- Expected error messages

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:ci
      - run: npm run test:e2e
```

### Coverage Reporting
Coverage reports are generated in:
- HTML: `coverage/index.html`
- JSON: `coverage/coverage-summary.json`
- LCOV: `coverage/lcov.info`

## Performance Benchmarks

| Operation | Target | Tests |
|-----------|--------|-------|
| Login (p95) | < 200ms | ✅ |
| Session validation | < 50ms | ✅ |
| Password hashing | 50-500ms | ✅ |
| Token generation | < 1ms | ✅ |
| Concurrent logins | 100 req/s | ✅ |

## Security Test Coverage

| Vulnerability | Tests | Status |
|---------------|-------|--------|
| SQL Injection | 14 | ✅ |
| XSS | 18 | ✅ |
| CSRF | 10 | ✅ |
| Session Security | 12 | ✅ |
| Rate Limiting | 12 | ✅ |
| Auth Security | 8 | ✅ |
| Info Disclosure | 2 | ✅ |

## Development Workflow

### 1. Write Tests First (TDD)
```bash
# Create test file
touch tests/unit/new-feature.test.ts

# Run in watch mode
npm run test:watch
```

### 2. Run Tests
```bash
# All tests
npm test

# Specific suite
npm run test:unit
```

### 3. Check Coverage
```bash
npm run test:coverage
open coverage/index.html
```

### 4. Run E2E Tests
```bash
# Headless
npm run test:e2e

# With UI
npm run test:e2e:ui

# Headed mode
npm run test:e2e:headed
```

## Troubleshooting

### Common Issues

**Jest timeout errors:**
```javascript
// Increase timeout in jest.setup.js
jest.setTimeout(30000);
```

**Playwright errors:**
```bash
# Install browsers
npx playwright install

# Check configuration
npx playwright test --config tests/setup/playwright.config.ts --list
```

**Database connection issues:**
- Verify test database is running
- Check environment variables
- Ensure migrations are applied

## Best Practices

1. **Isolation**: Each test should be independent
2. **Fast**: Unit tests should run in < 100ms
3. **Deterministic**: Tests should produce consistent results
4. **Clear**: Use descriptive test names
5. **Comprehensive**: Cover edge cases and error paths

## Test Naming Convention

```typescript
// ✅ Good
it('should reject weak password')
it('should prevent SQL injection')
it('should create session cookie')

// ❌ Bad
it('test 1')
it('works')
it('password')
```

## Adding New Tests

1. Identify test category (unit/integration/e2e/security/performance)
2. Add to appropriate test file
3. Use existing fixtures or create new ones
4. Run tests: `npm test`
5. Check coverage: `npm run test:coverage`
6. Update documentation if needed

## Environment Variables

Required for testing:
```env
NODE_ENV=test
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=test-secret-key
SESSION_SECRET=test-session-secret
```

## Dependencies

### Testing Libraries
- `jest` - Test runner
- `@testing-library/react` - React testing utilities
- `@playwright/test` - E2E testing
- `ts-jest` - TypeScript support for Jest
- `@testing-library/jest-dom` - Custom Jest matchers

### Installed Automatically
All testing dependencies are in `devDependencies` and installed with `npm install`.

## Test Execution Time

| Suite | Tests | Duration |
|-------|-------|----------|
| Unit | 256 | ~15s |
| Integration | 87 | ~30s |
| E2E | 45 | ~120s |
| Security | 68 | ~45s |
| Performance | 32 | ~90s |
| **Total** | **488** | **~5min** |

## Documentation

Detailed documentation available in:
- `tests/docs/TEST_DOCUMENTATION.md` - Comprehensive test documentation
- `tests/README.md` - This file

## Support

For issues or questions:
1. Check documentation in `tests/docs/`
2. Review existing tests for examples
3. Check test fixtures for available data

## License

Same as parent project

---

**Total Tests:** 488
**Coverage Target:** >90%
**Last Updated:** 2025-11-01
**Version:** 1.0.0
