import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../pageobjects/saucedemoLoginPage';
import { SaucedemoInventoryPage } from '../pageobjects/saucedemoInventoryPage';
import { SaucedemoCartPage } from '../pageobjects/saucedemoCartPage';

test('login sin usuario y sin contraseña muestra error', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  await loginPage.goto();
  await loginPage.login('', '');
  await expect(page.locator('//h3[@data-test="error"]')).toBeVisible();
});

test('agrega y remueve varios productos del carrito', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  const inventoryPage = new SaucedemoInventoryPage(page);
  const cartPage = new SaucedemoCartPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  let badge = await inventoryPage.getCartBadgeCount();
  expect(Number(badge)).toBe(2);
  await inventoryPage.goToCart();
  await page.locator('//button[contains(@id,"remove-sauce-labs-backpack")]').click();
  badge = await inventoryPage.getCartBadgeCount();
  expect(Number(badge)).toBe(1);
  await page.locator('//button[contains(@id,"remove-sauce-labs-bike-light")]').click();
  badge = await inventoryPage.getCartBadgeCount();
  expect(badge).toBeNull();
});

test('compra exitosa muestra mensaje de confirmación', async ({ page }) => {
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
  await page.locator('//button[@data-test="finish"]').click();
  await expect(page.locator('//h2[@class="complete-header" and text()="Thank you for your order!"]')).toBeVisible();
});
