// @ts-check
import { test, expect } from '@playwright/test';
import ROUTES from '../../src/constants/routes.mjs';

const BASE_PATH = 'http://localhost:5173';

test.describe('App Component Routes', () => {
  test('should render the Landing page', async ({ page }) => {
    await page.goto(BASE_PATH);
    expect(page.url()).toBe(BASE_PATH);
  });

  test('should render the SignUp page', async ({ page }) => {
    await page.goto(ROUTES.signup);
    expect(page.url()).toBe(BASE_PATH + ROUTES.signup);
  });

  test('should render the SignIn page', async ({ page }) => {
    await page.goto(ROUTES.login);
    expect(page.url()).toBe(BASE_PATH + ROUTES.login);
  });

  test('should render the Dashboard page', async ({ page }) => {
    await page.goto(ROUTES.dashboard);
    expect(page.url()).toBe(BASE_PATH + ROUTES.login);
  });

  test('should render the AdminDashboard page', async ({ page }) => {
    await page.goto(ROUTES.admin);
    expect(page.url()).toBe(BASE_PATH + ROUTES.login + '?admin=true');
  });

  test('should redirect non-existent routes to Landing', async ({ page }) => {
    await page.goto('/some-non-existent-route');
    expect(page.url()).toBe(BASE_PATH);
  });
});
