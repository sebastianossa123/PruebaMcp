import { Page } from '@playwright/test';

export class SaucedemoLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
  await this.page.locator('//input[@data-test="username"]').fill(username);
  await this.page.locator('//input[@data-test="password"]').fill(password);
  await this.page.locator('//input[@data-test="login-button"]').click();
  }

  async isLoggedIn() {
  return this.page.locator('//div[contains(@class,"inventory_list")]').isVisible();
  }

  async getErrorMessage() {
  return this.page.locator('//h3[@data-test="error"]').textContent();
  }
}
