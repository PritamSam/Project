import { expect, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

export async function loginHelper(page: Page, username: string, password: string) {
  const loginPage = new LoginPage(page);

  await page.goto('/');
  await loginPage.loginUser(username, password);
  await expect(page).toHaveURL(/.*amazon.*/);
}