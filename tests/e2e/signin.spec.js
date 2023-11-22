// @ts-check
import { test, expect } from '@playwright/test';
import ROUTES from '../../src/constants/routes.mjs';

const BASE_PATH = 'http://localhost:5173';

test.describe('SignIn Component', () => {
  test('should display error for invalid email', async ({ page }) => {
    await page.goto(ROUTES.login);
    await page.locator('css=#lang-selector-button').click();

    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'samplePassword');

    await page.getByRole('button', { name: 'Log in' }).click();

    const errorMessage = await page.textContent('span');
    expect(errorMessage).toBe('Credentials do not match an existing user.');
  });

  test('should sign in with valid credentials and redirect to dashboard', async ({
    page,
  }) => {
    const cookies = [
      { name: 'teacherId', value: '0', url: 'http://localhost:5173/' },
    ];
    await page.context().addCookies(cookies);
    await page.goto(BASE_PATH + ROUTES.dashboard);

    await page.getByLabel('Email *').fill('s@example.edu');
    await page.getByLabel('Email *').press('Tab');
    await page.getByLabel('Password *').fill('password');

    await page.getByLabel('Password *').press('Tab');
    await page.getByLabel('toggle password visibility').press('Tab');
    await page.getByLabel('Remember me').press('Tab');
    await page.getByRole('button', { name: 'Log in' }).press('Enter');

    await page.goto(ROUTES.dashboard);
    expect(page.url()).toBe(BASE_PATH + ROUTES.dashboard);
  });

  test("sign out from teacher's dashboard", async ({ page }) => {
    await page.goto(ROUTES.dashboard);
    await page.getByLabel('Log out').click();
    expect(page.url()).toBe(BASE_PATH + ROUTES.landing);
  });
});
