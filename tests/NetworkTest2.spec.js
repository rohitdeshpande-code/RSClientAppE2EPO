
const {test, expect} = require('@playwright/test')

test('Security test network intercept', async({page}) => {

    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator('#userEmail').fill('rdtest01@gmail.com')
    await page.locator('#userPassword').fill('PassworD@2025')
    await page.locator('[value="Login"]').click()
    //await page.waitForLoadState('networkidle')
    await page.locator('.card-body b').first().waitFor()

    await page.locator("button[routerlink*='myorders']").click()

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", 
        route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=693c144332ed8658712f3e07"})
    )
    await page.locator("button:has-text('View')").first().click()
    //await page.pause()

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")
})