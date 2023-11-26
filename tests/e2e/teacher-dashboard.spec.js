// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/login', { timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.getByLabel('Email *').fill('s@example.edu');
  await page.getByLabel('Password *').fill('password');
  await page.getByRole('button', { name: 'Log in' }).click();
});

test.describe('Teacher Dashboard', () => {
  test('should create a question session', async ({ page }) => {
    test.setTimeout(120000);
    await page.getByText('Topic...').click();
    await page.getByRole('option', { name: 'Mathematics' }).click();
    await page
      .getByPlaceholder('Write the question here...')
      .fill('Test Emoji Question');
    await page.locator('input[name="emoji-0"]').check();

    await page.getByRole('button', { name: 'ADD QUESTION' }).click();
    await page
      .getByPlaceholder('Write the question here...')
      .nth(1)
      .fill('Test Draw Question');
    await page.locator('input[name="draw-1"]').check();

    await page.getByRole('button', { name: 'ADD QUESTION' }).click();
    await page
      .getByPlaceholder('Write the question here...')
      .nth(2)
      .fill('Test Writing Question');
    await page.locator('input[name="write-2"]').check();
    await page.getByRole('button', { name: 'SEND QUESTIONS' }).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Question sent');
      dialog.accept();
    });

    await page.waitForTimeout(1000);
    await page.locator('div.sessionlist-container ul>li').nth(-1).click();
    await page.waitForTimeout(1000);
    expect(page.url()).toMatch(/.*\/results\/session\/\d+(\?question=\d+)?/);

    await expect(
      page.getByRole('button', { name: 'Test Emoji Question' }),
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole('button', { name: 'Test Draw Question' }),
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.getByRole('button', { name: 'Test Writing Question' }),
    ).toBeVisible({ timeout: 5000 });

    page.close();
  });

  test('should fail to create a question because missing all fields', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'SEND QUESTIONS' }).click();
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Fill in all questions before submitting');
      dialog.accept();
    });
  });

  test('should fail to create a question because missing topic', async ({
    page,
  }) => {
    await page
      .getByPlaceholder('Write the question here...')
      .fill('Test Question');
    await page.getByRole('button', { name: 'SEND QUESTIONS' }).click();

    await page.getByText('Emoji answer').click();
    await page.locator('input[name="emoji-0"]').check();
    await page.getByRole('button', { name: 'SEND QUESTIONS' }).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Fill in all questions before submitting');
      dialog.accept();
    });
  });

  test('should fail to create a question because missing question text', async ({
    page,
  }) => {
    await page.getByText('Topic...').click();
    await page.getByRole('option', { name: 'Mathematics' }).click();
    await page.getByRole('button', { name: 'SEND QUESTIONS' }).click();

    await page.getByText('Emoji answer').click();
    await page.locator('input[name="emoji-0"]').check();
    await page.getByRole('button', { name: 'SEND QUESTIONS' }).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Fill in all questions before submitting');
      dialog.accept();
    });
  });

  test('should fail to create a question because missing answer type', async ({
    page,
  }) => {
    await page.getByText('Topic...').click();
    await page.getByRole('option', { name: 'Mathematics' }).click();
    await page.getByRole('button', { name: 'SEND QUESTIONS' }).click();

    await page
      .getByPlaceholder('Write the question here...')
      .fill('Test Question');
    await page.getByRole('button', { name: 'SEND QUESTIONS' }).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Fill in all questions before submitting');
      dialog.accept();
    });
  });
});
