const {test, expect} = require('@playwright/test')

// test('First playwright test', async function() {

// })



test('@Web Browser Context Playwright test', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()

    //page.route("**/*.css", route => route.abort())
    //page.route("**/*.{jpg, jpeg, png}", route => route.abort())

    const userName =  page.locator("#username")
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-title a')

    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url(), response.status()))

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    
    await userName.fill("rahulshetty")
    await page.locator("#password").fill("Learning@830$3mK2")
    await signIn.click()

    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')

    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()

    // console.log(await cardTitles.first().textContent())
    // console.log(await cardTitles.nth(1).textContent())

    const allCardTitles = await cardTitles.allTextContents()
    console.log(allCardTitles)


})

test('@Web UI controls', async ({page}) => {


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const userName =  page.locator("#username")
    const signIn = page.locator('#signInBtn')
    const documentLink = page.locator("a[href*='documents-request']")

    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption("consult")


    await page.locator(".radiotextsty").nth(1).click()
    await page.locator("#okayBtn").click()

    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked()
    console.log(await page.locator(".radiotextsty").nth(1).isChecked())

    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()

    await expect(documentLink).toHaveAttribute("class", "blinkingText")
})

test('Child windows handeling', async ({browser}) => {

    const context = await browser.newContext()
    const page = await context.newPage()
    const userName =  page.locator("#username")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator("a[href*='documents-request']")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for any new page is to open
        documentLink.click()
    ])
    const text = await newPage.locator('.red').first().textContent()
    const arrayText = text.split("@")[1]
    const domain = arrayText.split(" ")[0]
    //console.log(domain)

    await userName.fill(domain)
    console.log(await userName.inputValue())
    
})