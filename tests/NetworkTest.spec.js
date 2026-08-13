
const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "rdtest01@gmail.com", userPassword: "PassworD@2025"}
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const {APiUtils} = require('../utils/ApiUtils')
const fakePayLoadOrders = {data:[],message:"No Orders"}

let response

test.beforeAll('', async () => {

    //Login API
    const apiContext = await request.newContext()
    const apiUtils = new APiUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad)

})



test('Place the Order', async ({page}) => {

    
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route => {
            const response = await page.request.fetch(route.request())
            const body = JSON.stringify(fakePayLoadOrders)
            route.fulfill(
            {
                response,
                body
                }
                
            )
        }
    )
    

    await page.locator("button[routerlink*='myorders']").click()
    
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent())  
    
})