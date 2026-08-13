
import {expect, type Page, type Locator} from '@playwright/test'

export class CartPage {

    page:Page
    cartProducts: Locator
    checkOut: Locator

    constructor(page: Page) {

        this.page = page
        this.cartProducts = page.locator('div li').first()
        this.checkOut = page.locator("text=Checkout")
    }

    async verifyProductIsDisplayed(productname: string) {

        await this.cartProducts.waitFor()
        const bool = await this.getProductLocator(productname).isVisible()
        expect(bool).toBeTruthy()
    }

    async clickOnCheckout() {
        await this.checkOut.click()
    }

    getProductLocator(productname: string) {
        return this.page.locator("h3:has-text('"+productname+"')");
    }
}

module.exports = {CartPage}