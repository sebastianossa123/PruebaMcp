test('login exitoso con problem_user', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('problem_user', 'secret_sauce');
  await expect(page.locator('//div[contains(@class,"inventory_list")]')).toBeVisible();
});
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

test('usuario bloqueado muestra mensaje de error', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(page.locator('//h3[@data-test="error"]')).toBeVisible();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Sorry, this user has been locked out.');
});
