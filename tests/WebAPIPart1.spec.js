
const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "rdtest01@gmail.com", userPassword: "PassworD@2025"}
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const {APiUtils} = require('../utils/ApiUtils')

let response

test.beforeAll('', async () => {

    //Login API
    const apiContext = await request.newContext()
    const apiUtils = new APiUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)

})



test('@API Place the Order', async ({page}) => {

    
    // await page.goto("https://rahulshettyacademy.com/client/")
    // await page.locator("#userEmail").fill(email)
    // await page.locator("#userPassword").fill("PassworD@2025")
    // await page.locator("input[value='Login']").click()

    // //await page.waitForLoadState('networkidle')
    // await page.locator(".card-body b").first().waitFor()


    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client/")

    await page.locator("button[routerlink*='myorders']").click()

    await page.locator("tbody").first().waitFor()
    const rows = page.locator("tbody tr")
    const rowsCount = await rows.count()
    for(let i=0; i<rowsCount; ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent()
        if(response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click()
            break
        }
    }

    const orderIdDetails = await page.locator("div.col-text").textContent()
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy()
})