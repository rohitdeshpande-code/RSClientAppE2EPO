
const {test, expect, request} = require('@playwright/test')
const {customtest} = require('../utils/fixtures')



customtest('fixture demo', async({authenticatedPage, createOrder, testDataForOrder}) => {

    await authenticatedPage.goto("https://rahulshettyacademy.com/client/")

    //Login to application/ created order and verify if the order is created from history page
    await authenticatedPage.locator("button[routerlink*='myorders']").click()

    await authenticatedPage.locator("tbody").first().waitFor()

    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible()

    console.log(testDataForOrder.productName)

})