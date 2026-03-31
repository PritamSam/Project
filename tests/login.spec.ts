import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import testData from '../testData/test.json';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
});

test('Login with valid credentials', async ({ page }) => {

    await loginPage.loginUser(testData.Valid_Username, testData.Valid_Password);
    await expect(page).toHaveURL(/.*amazon.*/);

  });