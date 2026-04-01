import { Page, Locator } from '@playwright/test';

class LoginPage {

    page: Page;
    signin : Locator;
    username: Locator;
    continueButton: Locator;
    password: Locator;
    signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signin = page.locator('#nav-link-accountList a');
        this.username = page.getByLabel('Enter mobile number or email');
        this.continueButton = page.locator('input.a-button-input');
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.locator('#signInSubmit');
    }

    async loginUser(username: string, password: string) {
        await this.signin.click();
        await this.username.fill(username);
        await this.continueButton.click();
        await this.password.fill(password);
        await this.signInButton.click();
    }

    async loginWithInvalidUsername(username: string) {
        await this.signin.click();
        await this.username.fill(username);
        await this.continueButton.click();
    }
}

export default LoginPage;
