// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Session form', () => {
  test('fill form with valid data', async ({ page }) => {
    await page.goto('/session/3');

    await page.getByLabel('wink').locator('path').click();

    await page.getByLabel('pen').click();
    await page.locator('canvas').dblclick({
      position: {
        x: 110,
        y: 110,
      },
    });

    await page.getByLabel('red', { exact: true }).click();
    await page.locator('canvas').dblclick({
      position: {
        x: 120,
        y: 120,
      },
    });

    await page.getByLabel('green', { exact: true }).click();
    await page.locator('canvas').dblclick({
      position: {
        x: 130,
        y: 13,
      },
    });

    await page.getByLabel('blue', { exact: true }).click();
    await page.locator('canvas').dblclick({
      position: {
        x: 140,
        y: 140,
      },
    });

    await page.getByLabel('pen', { exact: true }).click();
    await page.locator('canvas').dblclick({
      position: {
        x: 100,
        y: 100,
      },
    });

    await page.getByLabel('erase', { exact: true }).click();
    await page.locator('canvas').dblclick({
      position: {
        x: 100,
        y: 100,
      },
    });

    await page
      .getByPlaceholder('Write feedback here..')
      .fill('This is a test answer');

    await page.getByPlaceholder('Write feedback here..').press('Tab');
    await page.getByRole('button', { name: 'Send' }).press('Enter');

    expect(page.url()).toBe('http://localhost:5173/thank-you');
    expect(page.getByText('Thank you for the answer!')).toBeTruthy();
  });
});
