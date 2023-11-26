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

const loginAdmin = async (page) => {
  await page.goto('http://localhost:5173/login?admin=true');
  await page.waitForTimeout(1000);
  await page.getByLabel('Email *').fill('admin@example.edu');
  await page.getByLabel('Password *').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(1000);
};

test.describe('App Component Routes', () => {
  test('should render the Landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    expect(page.url()).toBe('http://localhost:5173/');
  });

  test('should render the SignUp page', async ({ page }) => {
    await page.goto('/signup');
    await page.waitForTimeout(3000);
    expect(page.url()).toBe('http://localhost:5173/signup');
  });

  test('should render the SignIn page', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.goto('/login');
    expect(page.url()).toBe('http://localhost:5173/login');
  });

  test('should render the Dashboard page', async ({ page }) => {
    test.setTimeout(120000);
    await login(page);
    await page.goto('/dashboard');
    await page.waitForTimeout(3000);
    expect(page.url()).toBe('http://localhost:5173/dashboard');
  });

  test('should render the Admin login', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('/admin');
    await page.waitForTimeout(3000);
    expect(page.url()).toBe('http://localhost:5173/login?admin=true');
  });

  test('should render the Admin Dashboard page', async ({ page }) => {
    await loginAdmin(page);
    await page.waitForTimeout(3000);
    expect(page.url()).toBe('http://localhost:5173/admin');
  });

  test('should redirect non-existent routes to Landing', async ({ page }) => {
    await page.goto('/some-non-existent-route');
    await page.waitForTimeout(3000);
    expect(page.url()).toBe('http://localhost:5173/');
  });
});
