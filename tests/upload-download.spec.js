
const {test, expect} = require('@playwright/test')
const ExcelJs = require('exceljs');


async function writeExcelTest(searchText, replaceText, change, filePath) {
    
    const workbook = new ExcelJs.Workbook()
    //workbook.xlsx.readFile("C://Users/rohitde/Downloads/exceldownloadTest.xlsx").then(() => {
    await workbook.xlsx.readFile(filePath)
        const worksheet = workbook.getWorksheet("Sheet1")

        const output = await readExcel(worksheet, searchText)

        // worksheet.eachRow((row, rowNumber) => {

        //     row.eachCell((cell, columnNumber) => {
        //         //console.log(cell.value)
        //         if(cell.value == "Banana") {
        //             //console.log(rowNumber)
        //             //console.log(columnNumber)
        //             output.row = rowNumber
        //             output.col = columnNumber
        //         }
        //     })
        // })
        

        const cell = worksheet.getCell(output.row, output.col+change.colChange)
        cell.value = replaceText
        await workbook.xlsx.writeFile(filePath)
    //})
}

async function readExcel(worksheet, searchText) {

    let output = {row: -1, col: -1}
    worksheet.eachRow((row, rowNumber) => {

            row.eachCell((cell, columnNumber) => {
                //console.log(cell.value)
                if(cell.value == searchText) {
                    //console.log(rowNumber)
                    //console.log(columnNumber)
                    output.row = rowNumber
                    output.col = columnNumber
                }
            })
        })
        return output
}


//rowNumber and colNumber - which row and column number you currently in
//row and cell - Iterate through each and every row and column 

//Update Mango price to 350
//writeExcelTest("Mango", "Rabbit", "C://Users/rohitde/Downloads/exceldownloadTest.xlsx")
//writeExcelTest("Mango", 350, {rowChange: 0, colChange: 2}, "C://Users/rohitde/Downloads/exceldownloadTest.xlsx")

test('Upload Download Excel Validation', async({page}) => {

    const textSearch = "Mango"
    const updateValue = 350
    
    await page.goto("https://rahulshettyacademy.com/upload-download-test/")
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole("button", {name: "Download"}).click()
    await downloadPromise;
    writeExcelTest(textSearch, updateValue, {rowChange: 0, colChange: 2}, "C://Users/rohitde/Downloads/download.xlsx")
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles("C://Users/rohitde/Downloads/download.xlsx")

    const textLocator = page.getByText(textSearch)
    const desiredRow = await page.getByRole('row').filter({has: textLocator})
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue)
})


