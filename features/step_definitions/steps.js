
const {Given, When, Then, setDefaultTimeout} = require('@cucumber/cucumber')
const {POManager} = require('../../pageobjects/POManager')
const {expect} = require('@playwright/test')
const playwright = require('@playwright/test')

setDefaultTimeout(100 * 1000)

Given('a login to Ecommerce application with {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
    const products = this.page.locator(".card-body")
    const loginPage = this.poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(username, password)
});

When('Add {string} to Cart', async function (productname) {
  // Write code here that turns the phrase above into concrete actions
    const dashboardPage = this.poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(productname)
    await dashboardPage.navigateToCart()
});

Then('verify {string} is displayed in Cart page', async function (productname) {
  // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage()
    await cartPage.verifyProductIsDisplayed(productname)
    await cartPage.clickOnCheckout()
});

When('enter valid email {string} and place the order', async function (username) {
  // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage()
    await ordersReviewPage.searchCountryAndSelect('ind', 'India')
    await ordersReviewPage.verifyEmailId(username)
    this.orderId = await ordersReviewPage.submitAndGetOrderId('Thankyou for the order.')
    console.log(this.orderId)
    await ordersReviewPage.clickOrderLinkAtHeader()
});

Then('verify order is present in order history page', async function () {
  // Write code here that turns the phrase above into concrete actions
    const orderHistoryPage = this.poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(this.orderId)
    const orderIdDetails = await orderHistoryPage.getOrderId()
    expect(this.orderId.includes(orderIdDetails)).toBeTruthy()
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions
    const userName =  this.page.locator("#username")
    const signIn = this.page.locator('#signInBtn')
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await this.page.title())
    
    await userName.fill(username)
    await this.page.locator("#password").fill(password)
    await signIn.click()
});

Then('Verify Error message displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
    console.log(await this.page.locator("[style*='block']").textContent())
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect')
});