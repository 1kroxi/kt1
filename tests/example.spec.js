// @ts-check
const { test, expect } = require('@playwright/test');

async function openGoogle(page) {
  await page.goto('https://www.google.com/?hl=en');
}

test.describe('Google.com', () => {
  test('1. На главной странице есть нужные тексты', async ({ page }) => {
    await openGoogle(page);

    await expect(page).toHaveTitle(/Google/);
    await expect(page.getByRole('button', { name: 'Google Search' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Gmail' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Images' })).toBeVisible();
  });

  test('2. Форма поиска: ввод, фокус и очистка', async ({ page }) => {
    await openGoogle(page);

    const searchBox = page.locator('textarea[name="q"], input[name="q"]').first();
    await expect(searchBox).toBeVisible();

    await searchBox.click();
    await expect(searchBox).toBeFocused();

    await searchBox.fill('Playwright');
    await expect(searchBox).toHaveValue('Playwright');

    await searchBox.fill('');
    await expect(searchBox).toHaveValue('');
  });

  test('3. Переход на другую страницу сайта (Images)', async ({ page }) => {
    await openGoogle(page);

    await page.getByRole('link', { name: 'Images' }).first().click();

    await expect(page).toHaveURL(/imghp|udm=2|images/);
    await expect(page).toHaveTitle(/Google/);
  });
});