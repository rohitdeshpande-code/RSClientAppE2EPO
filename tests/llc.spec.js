
const {test, expect} = require('@playwright/test')

test('Playwright Special locators', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("PassworD@2025")
    await page.getByRole("button", {name: "Submit"}).click()

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000})

    // const bool = await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    // expect(bool).toBeTruthy()

    await page.getByRole("link", {name: "Shop"}).click()
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click()


    
})


test('Playwright Test level timeout', async ({page}) => {

    test.setTimeout(60000) //Test level test timeout
    const slowExpect = expect.configure({timeout: 9_000}) // Test level assert timeout 
    page.setDefaultTimeout(9000) //Test level Action timeout 

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill("PassworD@2025")
    await page.getByRole("button", {name: "Submit"}).click()

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible()

    // const bool = await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    // expect(bool).toBeTruthy()

    await page.getByRole("link", {name: "Shop"}).click()
    await expect(page.locator(".my-4").first()).toHaveText("Shop Name")
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click()


    
})