// @ts-check
import { test, expect } from '@playwright/test';
import ROUTES from '../../src/constants/routes.mjs';

test.describe('SignIn Component', () => {
  test('should display error for invalid email', async ({ page }) => {
    await page.goto(ROUTES.login); // Navigate to the login page

    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'samplePassword');

    await page.click('button[type="submit"]');

    // Assert that error message is displayed
    const errorMessage = await page.textContent('span');
    expect(errorMessage).toBe(
      'Tunnukset eivät täsmää olemassa olevaan käyttäjään.',
    );
  });

  test('should sign in with valid credentials and redirect to dashboard', async ({
    page,
  }) => {
    await page.goto(ROUTES.login); // Navigate to the login page

    await page.fill('input[name="email"]', 'valid-email@example.com'); // Use valid email
    await page.fill('input[name="password"]', 'correctPassword'); // Use correct password

    await page.click('button[type="submit"]');

    expect(page.url()).toBe(ROUTES.dashboard);
  });

  // lisää testeja tarvittaessa
});
