// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard');
  await page.goto('http://localhost:5173/login');
  await page.getByLabel('Sähköposti *').fill('s@example.edu');
  await page.getByLabel('Salasana *').fill('password');
  await page.getByRole('button', { name: 'Kirjaudu sisään' }).click();
});

test.describe('Teacher Dashboard', () => {
  test('should create a question session', async ({ page }) => {
    await page.getByText('Aihe...').click();
    await page.getByRole('option', { name: 'Matematiikka' }).click();
    await page
      .getByPlaceholder('Kirjoita kysymys tähän...')
      .fill('Testi Emoji Kysymys');
    await page.locator('input[name="emoji-0"]').check();

    await page.getByRole('button', { name: 'Lisää kysymys' }).click();
    await page
      .getByPlaceholder('Kirjoita kysymys tähän...')
      .nth(1)
      .fill('Testi Piirros Kysymys');
    await page.locator('input[name="draw-1"]').check();

    await page.getByRole('button', { name: 'Lisää kysymys' }).click();
    await page
      .getByPlaceholder('Kirjoita kysymys tähän...')
      .nth(2)
      .fill('Testi Kirjoitus Kysymys');
    await page.locator('input[name="write-2"]').check();
    await page.getByRole('button', { name: 'Lähetä kysymykset' }).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Kysymykset lähetetty');
      dialog.accept();
    });

    await page.locator('div.sessionlist-container ul>li').nth(-1).click();
    expect(page.url()).toMatch(/.*\/results\/session\/\d+(\?question=\d+)?/);

    await expect(
      page.getByRole('button', { name: 'Testi Emoji Kysymys' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Testi Piirros Kysymys' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Testi Kirjoitus Kysymys' }),
    ).toBeVisible();

    page.close();
  });

  test('should fail to create a question because missing all fields', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Lähetä kysymykset' }).click();
    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(
        'Täytä kaikki kysymykset ennen lähettämistä',
      );
      dialog.accept();
    });
  });

  test('should fail to create a question because missing topic', async ({
    page,
  }) => {
    await page
      .getByPlaceholder('Kirjoita kysymys tähän...')
      .fill('Testi Kysymys');
    await page.getByRole('button', { name: 'Lähetä kysymykset' }).click();

    await page.getByText('Emoji-vastaus').click();
    await page.locator('input[name="emoji-0"]').check();
    await page.getByRole('button', { name: 'Lähetä kysymykset' }).click();

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(
        'Täytä kaikki kysymykset ennen lähettämistä',
      );
      dialog.accept();
    });
  });
});

test('should fail to create a question because missing question text', async ({
  page,
}) => {
  await page.getByText('Aihe...').click();
  await page.getByRole('option', { name: 'Matematiikka' }).click();
  await page.getByRole('button', { name: 'Lähetä kysymykset' }).click();

  await page.getByText('Emoji-vastaus').click();
  await page.locator('input[name="emoji-0"]').check();
  await page.getByRole('button', { name: 'Lähetä kysymykset' }).click();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Täytä kaikki kysymykset ennen lähettämistä');
    dialog.accept();
  });
});

test('should fail to create a question because missing answer type', async ({
  page,
}) => {
  await page.getByText('Aihe...').click();
  await page.getByRole('option', { name: 'Matematiikka' }).click();
  await page.getByRole('button', { name: 'Lähetä kysymykset' }).click();

  await page
    .getByPlaceholder('Kirjoita kysymys tähän...')
    .fill('Testi Kysymys');
  await page.getByRole('button', { name: 'Lähetä kysymykset' }).click();

  page.once('dialog', async (dialog) => {
    expect(dialog.message()).toBe('Täytä kaikki kysymykset ennen lähettämistä');
    dialog.accept();
  });
});
