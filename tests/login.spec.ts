import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
const testData = require('../testData/test.json');

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/');
});

test('Login with valid credentials', async ({ page }) => {

    await loginPage.loginUser(testData.Valid_Username, testData.Valid_Password);
    await expect(page).toHaveURL(/.*amazon.*/);
});

test('Login with invalid username', async ({ page }) => {

    await loginPage.loginWithInvalidUsername(testData.Invalid_Username);
    await expect(page.locator('#invalid-email-alert  .a-alert-content')).toHaveText(' Invalid email address ');
});

test('Login with invalid password', async ({ page }) => {

    await loginPage.loginUser(testData.Valid_Username, testData.Invalid_Password);
    await expect(page.locator('#auth-error-message-box  .a-alert-content')).toHaveText(' Your password is incorrect ');
});