const {test, expect} = require('@playwright/test');

class OrdersReviewPage {

    constructor(page) {

        this.country = page.locator("input[placeholder='Select Country']")
        this.dropdown = page.locator("section.ta-results")
        this.emailId = page.locator(".user__name [type='text']")
        this.submit = page.locator(".actions .action__submit")
        this.orderConfirmationText = page.locator(".hero-primary")
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
        this.ordersLinkAtHeader = page.locator("button[routerlink*='myorders']")

    }

    async searchCountryAndSelect(countryCode, countryName) {

        await this.country.pressSequentially(countryCode)
        await this.dropdown.waitFor()
        const optionsCount = await this.dropdown.locator("button").count()
        for(let i=0; i< optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent()
            if(text === ' India') {
                await this.dropdown.locator("button").nth(i).click()
                break;
            }
        }
    }

    async verifyEmailId(username) {
        await expect(this.emailId.first()).toHaveText(username)
    }

    async submitAndGetOrderId(confirmMessage) {
        await this.submit.click()
        await expect(this.orderConfirmationText).toHaveText(confirmMessage)
        return await this.orderId.textContent()
    }

    async clickOrderLinkAtHeader() {
        await this.ordersLinkAtHeader.click()
    }

}

module.exports = {OrdersReviewPage}