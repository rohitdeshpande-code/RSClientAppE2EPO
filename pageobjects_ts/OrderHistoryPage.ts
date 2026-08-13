
import {expect, type Page, type Locator} from '@playwright/test'

export class OrderHistoryPage {

    page: Page
    ordersTable: Locator
    rows: Locator
    orderIdDetails: Locator


    constructor(page: Page) {
        
        this.page = page
        this.ordersTable = page.locator("tbody")
        this.rows = page.locator("tbody tr")
        this.orderIdDetails = page.locator("div.col-text")
    }

    async searchOrderAndSelect(orderId: any) {
        await this.ordersTable.first().waitFor()
        const rowsCount = await this.rows.count()
        for(let i=0; i<rowsCount; ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent()
            if(orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click()
                break
            }
        }
    }

    async getOrderId() {
        return await this.orderIdDetails.textContent()
    }

}

module.exports = {OrderHistoryPage}