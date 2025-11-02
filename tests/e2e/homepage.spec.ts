import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display homepage correctly', async ({ page }) => {
    // Check logo is visible
    await expect(page.locator('img[alt="Yieldo"]')).toBeVisible()

    // Check main heading/tagline
    await expect(page.locator('text=Kompleksowe rozwiązania AI')).toBeVisible()

    // Check AI Sekretarka module is visible
    await expect(page.locator('text=AI Sekretarka')).toBeVisible()

    // Check login button
    await expect(page.locator('button:has-text("Zaloguj")')).toBeVisible()
  })

  test('should navigate to AI Sekretarka page', async ({ page }) => {
    // Click on AI Sekretarka module
    await page.click('text=AI Sekretarka >> xpath=ancestor::a')

    // Should navigate to AI Sekretarka page
    await expect(page).toHaveURL('/ai-sekretarka')
  })

  test('should navigate to login page', async ({ page }) => {
    await page.click('button:has-text("Zaloguj")')
    await expect(page).toHaveURL('/login')
  })

  test('should display footer', async ({ page }) => {
    await expect(page.locator('text=© 2025 Yieldo')).toBeVisible()
  })

  test('should show "Dostępne Teraz" badge for AI Sekretarka', async ({ page }) => {
    await expect(page.locator('text=Dostępne Teraz')).toBeVisible()
  })

  test('should show "Wkrótce" badge for Grant Radar', async ({ page }) => {
    await expect(page.locator('text=Wkrótce')).toBeVisible()
  })

  test('should display CTA button', async ({ page }) => {
    const ctaButton = page.locator('button:has-text("Zacznij od AI Sekretarki")')
    await expect(ctaButton).toBeVisible()

    await ctaButton.click()
    await expect(page).toHaveURL('/ai-sekretarka')
  })

  test.describe('Responsive Design', () => {
    test('should display correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      await expect(page.locator('img[alt="Yieldo"]')).toBeVisible()
      await expect(page.locator('text=AI Sekretarka')).toBeVisible()
    })

    test('should display correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })

      await expect(page.locator('img[alt="Yieldo"]')).toBeVisible()
      await expect(page.locator('text=AI Sekretarka')).toBeVisible()
    })

    test('should display correctly on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })

      await expect(page.locator('img[alt="Yieldo"]')).toBeVisible()
      await expect(page.locator('text=AI Sekretarka')).toBeVisible()
    })
  })

  test.describe('Performance', () => {
    test('should load page within acceptable time', async ({ page }) => {
      const startTime = Date.now()
      await page.goto('/')
      const loadTime = Date.now() - startTime

      // Page should load within 3 seconds
      expect(loadTime).toBeLessThan(3000)
    })

    test('should have no console errors', async ({ page }) => {
      const consoleErrors: string[] = []

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })

      await page.goto('/')

      // Allow page to fully load
      await page.waitForLoadState('networkidle')

      expect(consoleErrors.length).toBe(0)
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper page title', async ({ page }) => {
      const title = await page.title()
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(0)
    })

    test('should have alt text for images', async ({ page }) => {
      const logo = page.locator('img[alt="Yieldo"]')
      const alt = await logo.getAttribute('alt')
      expect(alt).toBe('Yieldo')
    })

    test('should be keyboard navigable', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')

      // At least one element should have focus
      const focusedElement = await page.locator(':focus').count()
      expect(focusedElement).toBeGreaterThan(0)
    })
  })
})
