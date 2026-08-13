const { test, expect } = require('@playwright/test');

class SauceDemoLoginPage {
    constructor(page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: /log in/i });
        this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
        this.passwordInput = page.getByLabel('Password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async openLoginPage() {
        await this.page.goto('https://sauce-demo.myshopify.com/');
        await this.loginLink.click();
        await this.page.waitForURL(/\/account\/login/);
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}

test('@Web Sauce Demo Login', async ({ page }) => {
    const loginPage = new SauceDemoLoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login('test123@qa.com', 'test1234');

    await expect(page).toHaveURL(/\/account\/login/);
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});