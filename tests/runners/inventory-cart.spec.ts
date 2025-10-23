import { test, expect } from '@playwright/test';
import { SaucedemoLoginPage } from '../pageobjects/saucedemoLoginPage';
import { SaucedemoInventoryPage } from '../pageobjects/saucedemoInventoryPage';
import { SaucedemoCartPage } from '../pageobjects/saucedemoCartPage';

test('verifica productos en inventario usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  const inventoryPage = new SaucedemoInventoryPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page.locator('//div[contains(@class,"inventory_list")]')).toBeVisible();
  const products = await inventoryPage.getProductNames();
  expect(products.length).toBeGreaterThan(0);
});

test('agrega producto al carrito y valida badge usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  const inventoryPage = new SaucedemoInventoryPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  const badge = await inventoryPage.getCartBadgeCount();
  expect(Number(badge)).toBe(1);
});

test('verifica producto en el carrito usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  const inventoryPage = new SaucedemoInventoryPage(page);
  const cartPage = new SaucedemoCartPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await expect(page.locator('//div[@class="cart_list"]')).toBeVisible();
  const items = await cartPage.getCartItems();
  expect(items.some(item => item.includes('Sauce Labs Backpack'))).toBeTruthy();
});

test('agrega dos productos y valida el badge usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  const inventoryPage = new SaucedemoInventoryPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  const badge = await inventoryPage.getCartBadgeCount();
  expect(Number(badge)).toBe(2);
});

test('el carrito está vacío al inicio usando XPath', async ({ page }) => {
  const loginPage = new SaucedemoLoginPage(page);
  const inventoryPage = new SaucedemoInventoryPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  const badge = await inventoryPage.getCartBadgeCount();
  expect(badge).toBeNull();
});
