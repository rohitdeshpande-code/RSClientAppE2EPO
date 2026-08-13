import {expect, type Page, type Locator} from '@playwright/test'

export class OrdersReviewPage {

    page: Page
    country: Locator
    dropdown: Locator
    emailId: Locator
    submit: Locator
    orderConfirmationText: Locator
    orderId: Locator
    ordersLinkAtHeader: Locator

    constructor(page: Page) {

        this.page = page
        this.country = page.locator("input[placeholder='Select Country']")
        this.dropdown = page.locator("section.ta-results")
        this.emailId = page.locator(".user__name [type='text']")
        this.submit = page.locator(".actions .action__submit")
        this.orderConfirmationText = page.locator(".hero-primary")
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted")
        this.ordersLinkAtHeader = page.locator("button[routerlink*='myorders']")

    }

    async searchCountryAndSelect(countryCode: string, countryName: string) {

        await this.country.pressSequentially(countryCode)
        await this.dropdown.waitFor()
        const optionsCount = await this.dropdown.locator("button").count()
        for(let i=0; i< optionsCount; ++i) {
            let text: any
            text = await this.dropdown.locator("button").nth(i).textContent()
            if(text === ' India') {
                await this.dropdown.locator("button").nth(i).click()
                break;
            }
        }
    }

    async verifyEmailId(username: string) {
        await expect(this.emailId.first()).toHaveText(username)
    }

    async submitAndGetOrderId(confirmMessage: string) {
        await this.submit.click()
        await expect(this.orderConfirmationText).toHaveText(confirmMessage)
        return await this.orderId.textContent()
    }

    async clickOrderLinkAtHeader() {
        await this.ordersLinkAtHeader.click()
    }

}

module.exports = {OrdersReviewPage}