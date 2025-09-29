import { Page } from '@playwright/test';

export class SaucedemoInventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isLoaded() {
  return this.page.locator('//div[@class="inventory_list"]').isVisible();
  }

  async getProductNames() {
  return this.page.locator('//div[@class="inventory_item_name"]').allTextContents();
  }

  async addProductToCart(productName: string) {
  await this.page.locator('//div[@class="inventory_item_name" and text()="' + productName + '"]/ancestor::div[@class="inventory_item"]//button[contains(@id,"add-to-cart")]').click();
  }

  async getCartBadgeCount() {
  return this.page.locator('//span[contains(@class,"shopping_cart_badge")]').textContent();
  }

  async goToCart() {
  await this.page.locator('//a[contains(@class,"shopping_cart_link")]').click();
  }
}
