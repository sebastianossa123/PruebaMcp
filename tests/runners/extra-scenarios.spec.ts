import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../pageobjects/saucedemoLoginPage';
import { SaucedemoInventoryPage } from '../pageobjects/saucedemoInventoryPage';
import { SaucedemoCartPage } from '../pageobjects/saucedemoCartPage';

test('filtra productos por precio de menor a mayor', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.locator('//select[@data-test="product_sort_container"]').selectOption('lohi');
  const prices = await page.locator('//div[@class="inventory_item_price"]').allTextContents();
  const sorted = [...prices].sort((a, b) => parseFloat(a.replace('$','')) - parseFloat(b.replace('$','')));
  expect(prices).toEqual(sorted);
});

test('remueve producto del carrito', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  const inventoryPage = new SaucedemoInventoryPage(page);
  const cartPage = new SaucedemoCartPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await page.locator('//button[contains(@id,"remove-sauce-labs-backpack")]').click();
  const items = await cartPage.getCartItems();
  expect(items.some(item => item.includes('Sauce Labs Backpack'))).toBeFalsy();
});

test('checkout hasta resumen', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  const inventoryPage = new SaucedemoInventoryPage(page);
  const cartPage = new SaucedemoCartPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.checkout();
  await page.locator('//input[@data-test="firstName"]').fill('Test');
  await page.locator('//input[@data-test="lastName"]').fill('User');
  await page.locator('//input[@data-test="postalCode"]').fill('12345');
  await page.locator('//input[@data-test="continue"]').click();
  await expect(page.locator('//span[@class="title" and text()="Checkout: Overview"]')).toBeVisible();
});

test('logout del usuario', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.locator('//button[@id="react-burger-menu-btn"]').click();
  await page.locator('//a[@id="logout_sidebar_link"]').click();
  await expect(page.locator('//input[@data-test="username"]')).toBeVisible();
});
