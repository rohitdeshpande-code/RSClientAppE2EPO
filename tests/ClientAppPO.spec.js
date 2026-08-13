const {test, expect} = require('@playwright/test')
const {customtest} = require('../utils/test-base')

const {POManager} = require('../pageobjects/POManager')
//const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')))
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData2.json')))

// test('Client App Login', async ({page}) => {

//     const products = page.locator(".card-body")
//     const poManager = new POManager(page)

//     const loginPage = poManager.getLoginPage()
//     await loginPage.goTo()
//     await loginPage.validLogin(dataset.username, dataset.password)

//     const dashboardPage = poManager.getDashboardPage()
//     await dashboardPage.searchProductAddCart(dataset.productname)
//     await dashboardPage.navigateToCart()

//     const cartPage = poManager.getCartPage()
//     await cartPage.verifyProductIsDisplayed(dataset.productname)
//     await cartPage.checkOut()

//     const ordersReviewPage = poManager.getOrdersReviewPage()
//     await ordersReviewPage.searchCountryAndSelect('ind', 'India')
//     await ordersReviewPage.verifyEmailId(dataset.username)
//     const orderId = await ordersReviewPage.submitAndGetOrderId('Thankyou for the order.')
//     console.log(orderId)
//     await ordersReviewPage.clickOrderLinkAtHeader()

//     const orderHistoryPage = poManager.getOrderHistoryPage()
//     await orderHistoryPage.searchOrderAndSelect(orderId)
//     const orderIdDetails = await orderHistoryPage.getOrderId()
//     expect(orderId.includes(orderIdDetails)).toBeTruthy()
// })

for(const data of dataset) {

    test(`@Web Client App Login for ${data.productname}`, async ({page}) => {

    const products = page.locator(".card-body")
    const poManager = new POManager(page)

    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(data.username, data.password)

    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(data.productname)
    await dashboardPage.navigateToCart()

    const cartPage = poManager.getCartPage()
    await cartPage.verifyProductIsDisplayed(data.productname)
    await cartPage.clickOnCheckout()

    const ordersReviewPage = poManager.getOrdersReviewPage()
    await ordersReviewPage.searchCountryAndSelect('ind', 'India')
    await ordersReviewPage.verifyEmailId(data.username)
    const orderId = await ordersReviewPage.submitAndGetOrderId('Thankyou for the order.')
    console.log(orderId)
    await ordersReviewPage.clickOrderLinkAtHeader()

    const orderHistoryPage = poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderId)
    const orderIdDetails = await orderHistoryPage.getOrderId()
    expect(orderId.includes(orderIdDetails)).toBeTruthy()
})
}

customtest('Client App Login', async ({page, testDataForOrder}) => {

    const products = page.locator(".card-body")
    const poManager = new POManager(page)

    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password)

    const dashboardPage = poManager.getDashboardPage()
    await dashboardPage.searchProductAddCart(testDataForOrder.productname)
    await dashboardPage.navigateToCart()

    const cartPage = poManager.getCartPage()
    await cartPage.verifyProductIsDisplayed(testDataForOrder.productname)
    await cartPage.clickOnCheckout()

    const ordersReviewPage = poManager.getOrdersReviewPage()
    await ordersReviewPage.searchCountryAndSelect('ind', 'India')
    await ordersReviewPage.verifyEmailId(testDataForOrder.username)
    const orderId = await ordersReviewPage.submitAndGetOrderId('Thankyou for the order.')
    console.log(orderId)
    await ordersReviewPage.clickOrderLinkAtHeader()

    const orderHistoryPage = poManager.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderId)
    const orderIdDetails = await orderHistoryPage.getOrderId()
    expect(orderId.includes(orderIdDetails)).toBeTruthy()
})


