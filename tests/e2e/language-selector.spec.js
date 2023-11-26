// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/', { timeout: 10000 });
  await page.waitForTimeout(3000); // fixes test failing on firefox occasionally
  await page.waitForSelector('#lang-selector-button', {
    state: 'visible',
  });
});

const changeLanguage = async (page, language) => {
  const languageSelector = page.locator('#lang-selector-button').first();
  await languageSelector.click();
  await page.getByRole('menuitem', { name: language }).click();
  await page.waitForTimeout(1000); // fixes translations not applying on webkit
};

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

test.describe('Language Selector', () => {
  test('language options should include english, finnish & arabic', async ({
    page,
  }) => {
    await page.locator('#lang-selector-button').first().click();
    await page.waitForTimeout(1000);

    await expect(page.getByRole('menuitem', { name: 'English' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Finnish' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Arabic' })).toBeVisible();
  });

  test('should change language with menu', async ({ page }) => {
    const headingElem = page.locator('.landing-container h2').first();

    await changeLanguage(page, 'Finnish');
    expect(await headingElem?.textContent()).toBe(
      'Moderni palautejärjestelmä opetukseen',
    );

    await changeLanguage(page, 'English');
    expect(await headingElem?.textContent()).toBe(
      'Modern feedback system for education',
    );

    await changeLanguage(page, 'Arabic');
    expect(await headingElem?.textContent()).toBe(
      'نظام تغذية راجعة حديث للتعليم',
    );
  });

  test('should change content direction with arabic', async ({ page }) => {
    const headingElem = page.locator('.landing-container h2').first();

    await changeLanguage(page, 'Arabic');
    expect(await headingElem?.textContent()).toBe(
      'نظام تغذية راجعة حديث للتعليم',
    );

    const contentDirectionWrapper = page.locator('#root > div').first();
    expect(await contentDirectionWrapper.getAttribute('dir')).toBe('rtl');
  });

  test('language change should persist navigation', async ({ page }) => {
    const headingElem = page.locator('.landing-container h2').first();

    expect(await headingElem?.textContent()).toBe(
      'Modern feedback system for education',
    );

    await changeLanguage(page, 'Finnish');
    expect(await headingElem?.textContent()).toBe(
      'Moderni palautejärjestelmä opetukseen',
    );

    await page.getByLabel('Kirjaudu sisään').click();
    expect(page.url()).toBe('http://localhost:5173/login');
    const loginHeading = page.getByRole('heading', { level: 1 }).first();
    expect(await loginHeading.textContent()).toBe('Kirjaudu sisään');

    await changeLanguage(page, 'English');
    expect(await loginHeading.textContent()).toBe('Log in');
  });

  test('menu exists on relevant pages', async ({ page }) => {
    test.setTimeout(120000);
    const menu = page.locator('#lang-selector-button').first();

    // landing page
    await expect(menu).toBeVisible();

    await page.goto('/login');
    await page.waitForTimeout(1000);
    await expect(menu).toBeVisible();

    await page.goto('/signup');
    await page.waitForTimeout(1000);
    await expect(menu).toBeVisible();

    await page.goto('/session/1');
    await page.waitForTimeout(1000);
    await expect(menu).toBeVisible();

    await login(page);
    await expect(menu).toBeVisible();

    await page.goto('/results/session/1');
    await page.waitForTimeout(1000);
    await expect(menu).toBeVisible();

    await loginAdmin(page);
    await page.waitForTimeout(1000);
    await expect(menu).toBeVisible();
  });
});
