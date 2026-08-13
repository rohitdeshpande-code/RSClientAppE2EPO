
import {test as baseTest} from '@playwright/test'

interface TestDataForOrder {
    username: string,
    password: string,
    productname: string
}

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
{
    testDataForOrder: {
        username: "rdtest01@gmail.com",
        password: "PassworD@2025",
        productname: "ZARA COAT 3"
    }
}
    
)