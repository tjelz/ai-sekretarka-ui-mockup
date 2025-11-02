import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('User Registration', () => {
    test('should complete registration flow successfully', async ({ page }) => {
      // Navigate to login page
      await page.click('text=Zaloguj')
      await expect(page).toHaveURL('/login')

      // Switch to registration tab
      await page.click('button:has-text("Zarejestruj")')

      // Fill registration form
      const timestamp = Date.now()
      await page.fill('[name="name"]', 'Test User')
      await page.fill('[name="email"]', `testuser${timestamp}@example.com`)
      await page.fill('[name="password"]', 'TestPassword123!')

      // Submit form
      await page.click('button:has-text("Utwórz konto")')

      // Should redirect to dashboard
      await expect(page).toHaveURL('/dashboard', { timeout: 10000 })
      await expect(page.locator('text=Welcome')).toBeVisible()
    })

    test('should show error for duplicate email', async ({ page }) => {
      await page.goto('/login')
      await page.click('button:has-text("Zarejestruj")')

      // Use an email that might already exist
      await page.fill('[name="name"]', 'Duplicate User')
      await page.fill('[name="email"]', 'existing@example.com')
      await page.fill('[name="password"]', 'Password123!')

      await page.click('button:has-text("Utwórz konto")')

      // Should show error (might be duplicate or other validation)
      const errorVisible = await page.locator('[role="alert"]').isVisible()
      expect(errorVisible).toBeTruthy()
    })

    test('should validate password length', async ({ page }) => {
      await page.goto('/login')
      await page.click('button:has-text("Zarejestruj")')

      await page.fill('[name="name"]', 'Test User')
      await page.fill('[name="email"]', 'test@example.com')
      await page.fill('[name="password"]', 'short')

      // HTML5 validation should prevent submission
      const passwordInput = page.locator('[name="password"]')
      const minLength = await passwordInput.getAttribute('minLength')
      expect(minLength).toBe('8')
    })

    test('should validate email format', async ({ page }) => {
      await page.goto('/login')
      await page.click('button:has-text("Zarejestruj")')

      await page.fill('[name="name"]', 'Test User')
      await page.fill('[name="email"]', 'invalid-email')
      await page.fill('[name="password"]', 'Password123!')

      // HTML5 validation should prevent submission
      const emailInput = page.locator('[name="email"]')
      const inputType = await emailInput.getAttribute('type')
      expect(inputType).toBe('email')
    })
  })

  test.describe('User Login', () => {
    test('should login with valid credentials', async ({ page }) => {
      // First, register a user
      await page.goto('/login')
      await page.click('button:has-text("Zarejestruj")')

      const timestamp = Date.now()
      const email = `logintest${timestamp}@example.com`
      const password = 'TestPassword123!'

      await page.fill('[name="name"]', 'Login Test User')
      await page.fill('[name="email"]', email)
      await page.fill('[name="password"]', password)
      await page.click('button:has-text("Utwórz konto")')

      // Wait for redirect to dashboard
      await expect(page).toHaveURL('/dashboard', { timeout: 10000 })

      // Sign out
      await page.click('button:has-text("Sign Out")')
      await expect(page).toHaveURL('/login')

      // Now login
      await page.fill('[id="login-email"]', email)
      await page.fill('[id="login-password"]', password)
      await page.click('button:has-text("Zaloguj się")')

      // Should redirect to dashboard
      await expect(page).toHaveURL('/dashboard', { timeout: 10000 })
      await expect(page.locator('text=Welcome')).toBeVisible()
    })

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/login')

      await page.fill('[id="login-email"]', 'nonexistent@example.com')
      await page.fill('[id="login-password"]', 'WrongPassword123!')
      await page.click('button:has-text("Zaloguj się")')

      // Should show error message
      await expect(page.locator('text=Invalid email or password')).toBeVisible({ timeout: 5000 })
    })

    test('should show loading state during login', async ({ page }) => {
      await page.goto('/login')

      await page.fill('[id="login-email"]', 'test@example.com')
      await page.fill('[id="login-password"]', 'Password123!')

      // Click and immediately check for loading state
      await page.click('button:has-text("Zaloguj się")')
      await expect(page.locator('button:has-text("Logowanie...")')).toBeVisible()
    })
  })

  test.describe('Dashboard Access', () => {
    test('should redirect to login when accessing dashboard without auth', async ({ page }) => {
      await page.goto('/dashboard')

      // Should redirect to login
      await expect(page).toHaveURL('/login')
    })

    test('should display user information on dashboard', async ({ page }) => {
      // Register and login
      await page.goto('/login')
      await page.click('button:has-text("Zarejestruj")')

      const timestamp = Date.now()
      const name = 'Dashboard Test User'
      const email = `dashboardtest${timestamp}@example.com`

      await page.fill('[name="name"]', name)
      await page.fill('[name="email"]', email)
      await page.fill('[name="password"]', 'TestPassword123!')
      await page.click('button:has-text("Utwórz konto")')

      // Should be on dashboard
      await expect(page).toHaveURL('/dashboard')
      await expect(page.locator(`text=${name}`)).toBeVisible()
      await expect(page.locator(`text=${email}`)).toBeVisible()
    })

    test('should sign out successfully', async ({ page }) => {
      // Register first
      await page.goto('/login')
      await page.click('button:has-text("Zarejestruj")')

      const timestamp = Date.now()
      await page.fill('[name="name"]', 'Signout Test')
      await page.fill('[name="email"]', `signout${timestamp}@example.com`)
      await page.fill('[name="password"]', 'TestPassword123!')
      await page.click('button:has-text("Utwórz konto")')

      await expect(page).toHaveURL('/dashboard')

      // Sign out
      await page.click('button:has-text("Sign Out")')

      // Should redirect to login
      await expect(page).toHaveURL('/login')

      // Should not be able to access dashboard
      await page.goto('/dashboard')
      await expect(page).toHaveURL('/login')
    })
  })

  test.describe('Session Persistence', () => {
    test('should maintain session after page reload', async ({ page }) => {
      // Register and login
      await page.goto('/login')
      await page.click('button:has-text("Zarejestruj")')

      const timestamp = Date.now()
      await page.fill('[name="name"]', 'Session Test')
      await page.fill('[name="email"]', `session${timestamp}@example.com`)
      await page.fill('[name="password"]', 'TestPassword123!')
      await page.click('button:has-text("Utwórz konto")')

      await expect(page).toHaveURL('/dashboard')

      // Reload page
      await page.reload()

      // Should still be on dashboard
      await expect(page).toHaveURL('/dashboard')
      await expect(page.locator('text=Welcome')).toBeVisible()
    })
  })
})
