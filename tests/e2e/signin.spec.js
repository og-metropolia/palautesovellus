// @ts-check
import { test, expect } from '@playwright/test';

const login = async (page) => {
  await page.goto('/login');
  await page.waitForTimeout(1000);
  await page.getByLabel('Email *').fill('s@example.edu');
  await page.getByLabel('Password *').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(1000);
};

test.describe('SignIn Component', () => {
  test('should display error for invalid email', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email *').fill('invalid-email');
    await page.getByLabel('Email *').press('Tab');
    await page.getByLabel('Password *').fill('invalidPassword');

    await page.getByLabel('Password *').press('Tab');
    await page.getByLabel('toggle password visibility').press('Tab');
    await page.getByLabel('Remember me').press('Tab');
    await page.getByRole('button', { name: 'Log in' }).press('Enter');

    expect(page.url()).toBe('http://localhost:5173/login');
  });

  test('should sign in with valid credentials and redirect to dashboard', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.getByLabel('Email *').fill('s@example.edu');
    await page.getByLabel('Email *').press('Tab');
    await page.getByLabel('Password *').fill('password');

    await page.getByLabel('Password *').press('Tab');
    await page.getByLabel('toggle password visibility').press('Tab');
    await page.getByLabel('Remember me').press('Tab');
    await page.getByRole('button', { name: 'Log in' }).press('Enter');

    await page.waitForTimeout(1000);
    expect(page.url()).toBe('http://localhost:5173/dashboard');
  });

  test("sign out from teacher's dashboard", async ({ page }) => {
    await login(page);
    await page.goto('/dashboard');
    await page.getByLabel('Log out').click();
    expect(page.url()).toBe('http://localhost:5173/');
  });
});
