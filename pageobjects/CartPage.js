const {test, expect} = require('@playwright/test');

class CartPage {

    constructor(page) {

        this.page = page
        this.cartProducts = page.locator('div li').first()
        this.checkOut = page.locator("text=Checkout")
    }

    async verifyProductIsDisplayed(productname) {

        await this.cartProducts.waitFor()
        const bool = await this.getProductLocator(productname).isVisible()
        expect(bool).toBeTruthy()
    }

    async clickOnCheckout() {
        await this.checkOut.click()
    }

    getProductLocator(productname) {
        return this.page.locator("h3:has-text('"+productname+"')");
    }
}

module.exports = {CartPage}