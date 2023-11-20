// @ts-check
import { test, expect } from '@playwright/test';
import ROUTES from '../../src/constants/routes.mjs';

const BASE_PATH = 'http://localhost:5173';

test.describe('SignIn Component', () => {
  test('should display error for invalid email', async ({ page }) => {
    await page.goto(ROUTES.login);

    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'samplePassword');

    await page.getByRole('button', { name: 'Log in' }).click();

    const errorMessage = await page.textContent('span');
    expect(errorMessage).toBe('Credentials do not match an existing user.');
  });

  test('should sign in with valid credentials and redirect to dashboard', async ({
    page,
  }) => {
    await page.goto(ROUTES.login);

    await page.fill('input[name="email"]', 's@example.edu');
    await page.fill('input[name="password"]', 'password');
    await page.getByRole('button', { name: 'Log in' }).click();

    expect(page.url()).toBe(BASE_PATH + ROUTES.dashboard);
  });

  test("sign out from teacher's dashboard", async ({ page }) => {
    await page.goto(ROUTES.dashboard);
    await page.getByLabel('Log out').click();
    expect(page.url()).toBe(BASE_PATH + ROUTES.landing);
  });
});
