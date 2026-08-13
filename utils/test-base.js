
const base = require('@playwright/test')

exports.customtest = base.test.extend(
{
    testDataForOrder: {
        username: "rdtest01@gmail.com",
        password: "PassworD@2025",
        productname: "ZARA COAT 3"
    }
}
    
)