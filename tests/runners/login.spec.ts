import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../pageobjects/saucedemoLoginPage';

test('login exitoso en saucedemo usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.locator('//div[contains(@class,"inventory_list")]')).toBeVisible();
});

test('login fallido en saucedemo usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user', 'invalid_password');
  await expect(page.locator('//h3[@data-test="error"]')).toBeVisible();
});

test('login sin password usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', '');
  await expect(page.locator('//h3[@data-test="error"]')).toBeVisible();
});

test('login sin usuario usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('', 'secret_sauce');
  await expect(page.locator('//h3[@data-test="error"]')).toBeVisible();
});
