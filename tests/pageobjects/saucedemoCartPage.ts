import { Page } from '@playwright/test';

export class SaucedemoCartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getCartItems() {
  return this.page.locator('//div[contains(@class,"cart_item")]//div[@class="inventory_item_name"]').allTextContents();
  }

  async isCartVisible() {
  return this.page.locator('//div[contains(@class,"cart_list")]').isVisible();
  }

  async checkout() {
  await this.page.locator('//button[@data-test="checkout"]').click();
  }
}
