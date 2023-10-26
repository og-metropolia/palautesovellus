// @ts-check
import { test, expect } from '@playwright/test';

test('simple test to test testing', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Kirjaudu sisään').click();
  await expect(
    page.getByRole('heading', { name: 'Kirjaudu sisään' }),
  ).toBeVisible();
});
