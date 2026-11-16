
const {test, expect} = require('@playwright/test')

test.describe('Test suite API tests', () => {

    let token
    let loginPayLoad = {userEmail: "rdtest01@gmail.com", userPassword: "PassworD@2025"}
    let orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}

    test('Generate and Fetch token after successful login', async ({request}) => {

        const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
            {
                data: loginPayLoad, 
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        await expect(response.status()).toBe(200)
        await expect(response.statusText()).toBe('OK')
        console.log('Buffer Response body: ', await response.body())
        console.log('Response headers: ', await response.headers())
        console.log('Response header array: ', await response.headersArray())
        console.log('Json response: ', await response.json())

        const responseJson = await response.json()
        token = responseJson.token
        console.log('Token: ', token)

    })

    test('Create order using token which fetched in login test case', async ({request}) => {

        const response = await request.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
            {
                data: orderPayLoad,
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        )

        await expect(response.status()).toBe(201)
        await expect(response.statusText()).toBe('Created')
        //console.log('Json Response: ', await response.json())
        const responseJson = await response.json()
        const orderId = responseJson.orders[0]
        console.log(orderId)
    })
})
