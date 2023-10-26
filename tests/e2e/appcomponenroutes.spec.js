// @ts-check
import { test, expect } from '@playwright/test';
import ROUTES from '../../src/constants/routes.mjs';

test.describe('App Component Routes', () => {
  test('should render the Landing page', async ({ page }) => {
    await page.goto(ROUTES.landing);
    // Add assertions for the Landing page elements or content
  });

  test('should render the SignUp page', async ({ page }) => {
    await page.goto(ROUTES.signup);
    // Add assertions for the SignUp page elements or content
  });

  test('should render the SignIn page', async ({ page }) => {
    await page.goto(ROUTES.login);
    // Add assertions for the SignIn page elements or content
  });

  test('should render the Dashboard page', async ({ page }) => {
    await page.goto(ROUTES.dashboard);
    // Add assertions for the Dashboard page elements or content
  });

  test('should render the AdminDashboard page', async ({ page }) => {
    await page.goto(ROUTES.admin);
    // Add assertions for the AdminDashboard page elements or content
  });

  test('should redirect non-existent routes to Landing', async ({ page }) => {
    await page.goto('/some-non-existent-route');
    // Assert that the page has been redirected to the Landing page
    expect(page.url()).toBe(ROUTES.landing);
  });
});
