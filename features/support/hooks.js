const playwright = require('@playwright/test')
const {POManager} = require('../../pageobjects/POManager')
const {Before, After, AfterStep, BeforeStep, Status} = require('@cucumber/cucumber')

Before(async function() {

    const browser = await playwright.chromium.launch({
        headless: false
    })

    const context = await browser.newContext()
    this.page = await context.newPage()
    this.poManager = new POManager(this.page)

})

BeforeStep(async function() {

})

AfterStep(async function({result})  {
    if(result.status === Status.FAILED) {
        await this.page.screenshot({path: 'screenshot123.png'})
    }
})

After(function() {
    console.log('I am the last to execute')
})