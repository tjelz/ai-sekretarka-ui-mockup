/**
 * End-to-End Tests for Authentication Flows
 * Tests complete user journeys through the authentication system
 *
 * @group e2e
 * @group auth
 */

import { test, expect, Page } from '@playwright/test';
import { validUsers, invalidUsers } from '../fixtures/auth.fixtures';

test.describe('User Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/register');
  });

  test('should complete full registration process', async ({ page }) => {
    await page.fill('[name="name"]', validUsers.standard.name);
    await page.fill('[name="email"]', validUsers.standard.email);
    await page.fill('[name="password"]', validUsers.standard.password);
    await page.fill('[name="confirmPassword"]', validUsers.standard.password);

    await page.click('button[type="submit"]');

    await page.waitForURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('should show validation errors for weak password', async ({ page }) => {
    await page.fill('[name="email"]', validUsers.standard.email);
    await page.fill('[name="password"]', '123');

    await page.click('button[type="submit"]');

    await expect(page.locator('[role="alert"]')).toContainText('Password');
  });

  test('should show error for password mismatch', async ({ page }) => {
    await page.fill('[name="password"]', validUsers.standard.password);
    await page.fill('[name="confirmPassword"]', 'DifferentPassword123!');

    await page.click('button[type="submit"]');

    await expect(page.locator('[role="alert"]')).toContainText('match');
  });

  test('should prevent duplicate registration', async ({ page }) => {
    await registerUser(page, validUsers.standard);

    await page.goto('/auth/logout');
    await page.goto('/auth/register');

    await registerUser(page, validUsers.standard);

    await expect(page.locator('[role="alert"]')).toContainText('already');
  });

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.locator('[name="password"]');
    const toggleButton = page.locator('[aria-label="Toggle password visibility"]');

    await expect(passwordInput).toHaveAttribute('type', 'password');

    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should have accessible form', async ({ page }) => {
    await expect(page.locator('[name="email"]')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Email')
    );
    await expect(page.locator('[name="password"]')).toHaveAttribute(
      'aria-label',
      expect.stringContaining('Password')
    );
  });
});

test.describe('User Login Flow', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/auth/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('[name="email"]', validUsers.standard.email);
    await page.fill('[name="password"]', validUsers.standard.password);

    await page.click('button[type="submit"]');

    await page.waitForURL('/dashboard');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('[name="email"]', validUsers.standard.email);
    await page.fill('[name="password"]', 'WrongPassword123!');

    await page.click('button[type="submit"]');

    await expect(page.locator('[role="alert"]')).toContainText('Invalid');
  });

  test('should persist session on refresh', async ({ page }) => {
    await loginUser(page, validUsers.standard);

    await page.reload();

    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    expect(page.url()).not.toContain('/auth/login');
  });

  test('should remember me checkbox work', async ({ page }) => {
    await page.fill('[name="email"]', validUsers.standard.email);
    await page.fill('[name="password"]', validUsers.standard.password);
    await page.check('[name="rememberMe"]');

    await page.click('button[type="submit"]');

    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c) => c.name === 'session');

    expect(sessionCookie?.expires).toBeGreaterThan(Date.now() / 1000 + 86400);
  });

  test('should autofocus email field', async ({ page }) => {
    await expect(page.locator('[name="email"]')).toBeFocused();
  });

  test('should handle Enter key submission', async ({ page }) => {
    await page.fill('[name="email"]', validUsers.standard.email);
    await page.fill('[name="password"]', validUsers.standard.password);

    await page.locator('[name="password"]').press('Enter');

    await page.waitForURL('/dashboard');
  });
});

test.describe('Logout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page, validUsers.standard);
  });

  test('should logout successfully', async ({ page }) => {
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');

    await page.waitForURL('/');
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c) => c.name === 'session');

    expect(sessionCookie).toBeUndefined();
  });

  test('should redirect to login when accessing protected route after logout', async ({ page }) => {
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');

    await page.goto('/dashboard');
    await page.waitForURL('/auth/login');
  });
});

test.describe('Protected Routes', () => {
  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard');

    await page.waitForURL('/auth/login');
    expect(page.url()).toContain('/auth/login');
  });

  test('should allow authenticated users to access protected routes', async ({ page }) => {
    await loginUser(page, validUsers.standard);

    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should preserve redirect URL after login', async ({ page }) => {
    await page.goto('/dashboard/settings');

    await page.waitForURL(/\/auth\/login/);
    expect(page.url()).toContain('redirect=/dashboard/settings');

    await loginUser(page, validUsers.standard);

    await page.waitForURL('/dashboard/settings');
  });
});

test.describe('Session Management', () => {
  test('should handle concurrent sessions', async ({ browser }) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    await loginUser(page1, validUsers.standard);
    await loginUser(page2, validUsers.standard);

    await expect(page1.locator('[data-testid="user-menu"]')).toBeVisible();
    await expect(page2.locator('[data-testid="user-menu"]')).toBeVisible();

    await context1.close();
    await context2.close();
  });

  test('should handle session expiration', async ({ page }) => {
    await loginUser(page, validUsers.standard);

    await page.context().addCookies([
      {
        name: 'session',
        value: 'expired-session-token',
        domain: 'localhost',
        path: '/',
        expires: Math.floor(Date.now() / 1000) - 1000,
      },
    ]);

    await page.reload();

    await page.waitForURL('/auth/login');
    await expect(page.locator('[role="alert"]')).toContainText('Session expired');
  });
});

test.describe('Password Reset Flow', () => {
  test('should request password reset', async ({ page }) => {
    await page.goto('/auth/forgot-password');

    await page.fill('[name="email"]', validUsers.standard.email);
    await page.click('button[type="submit"]');

    await expect(page.locator('[role="alert"]')).toContainText(
      'Check your email for reset instructions'
    );
  });

  test('should reset password with valid token', async ({ page }) => {
    const resetToken = 'valid-reset-token-123';

    await page.goto(`/auth/reset-password?token=${resetToken}`);

    const newPassword = 'NewSecurePass123!';
    await page.fill('[name="password"]', newPassword);
    await page.fill('[name="confirmPassword"]', newPassword);

    await page.click('button[type="submit"]');

    await expect(page.locator('[role="alert"]')).toContainText('Password reset successful');
    await page.waitForURL('/auth/login');
  });

  test('should reject expired reset token', async ({ page }) => {
    const expiredToken = 'expired-reset-token-456';

    await page.goto(`/auth/reset-password?token=${expiredToken}`);

    await expect(page.locator('[role="alert"]')).toContainText('expired or invalid');
  });
});

test.describe('Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/auth/login');

    await page.keyboard.press('Tab');
    await expect(page.locator('[name="email"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[name="password"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('button[type="submit"]')).toBeFocused();
  });

  test('should announce errors to screen readers', async ({ page }) => {
    await page.goto('/auth/login');

    await page.fill('[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    const alert = page.locator('[role="alert"]');
    await expect(alert).toHaveAttribute('aria-live', 'polite');
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display mobile-optimized login form', async ({ page }) => {
    await page.goto('/auth/login');

    const form = page.locator('form');
    await expect(form).toBeVisible();

    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBe(375);
  });

  test('should handle mobile keyboard', async ({ page }) => {
    await page.goto('/auth/register');

    await page.fill('[name="email"]', validUsers.standard.email);

    const emailInput = page.locator('[name="email"]');
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('autocomplete', expect.stringMatching(/email/));
  });
});

// Helper functions
async function registerUser(page: Page, user: typeof validUsers.standard) {
  await page.fill('[name="name"]', user.name);
  await page.fill('[name="email"]', user.email);
  await page.fill('[name="password"]', user.password);
  await page.fill('[name="confirmPassword"]', user.password);
  await page.click('button[type="submit"]');
}

async function loginUser(page: Page, user: typeof validUsers.standard) {
  await page.goto('/auth/login');
  await page.fill('[name="email"]', user.email);
  await page.fill('[name="password"]', user.password);
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
}
