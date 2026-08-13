
import {LoginPage} from './LoginPage'
import { DashboardPage } from '../pageobjects_ts/DashboardPage'
import { CartPage } from '../pageobjects_ts/CartPage'
import { OrdersReviewPage } from '../pageobjects_ts/OrdersReviewPage'
import { OrderHistoryPage } from '../pageobjects_ts/OrderHistoryPage'
import {type Page} from '@playwright/test'

export class POManager {

    loginPage: LoginPage
    dashboardPage: DashboardPage
    cartPage: CartPage
    ordersReviewPage: OrdersReviewPage
    orderHistoryPage: OrderHistoryPage
    page: Page

    constructor(page: any) {

        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.ordersReviewPage = new OrdersReviewPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getDashboardPage() {
        return this.dashboardPage
    }

    getCartPage() {
        return this.cartPage
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage
    }

    getOrderHistoryPage() {
        return this.orderHistoryPage
    }

}

module.exports = {POManager}