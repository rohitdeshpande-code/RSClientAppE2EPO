
let message1: string  = "Program1"
message1 = "DemoProgram1"
console.log(message1)

let age1: number = 20
console.log(age1)

let isActive: boolean = true
console.log(isActive)

let numbers1: number[] = [1,2,3]
console.log(numbers1)

let text: any = "This applicable to automation"
text = 42
console.log(text)

function addts(a: number,b: number) : number {
    return a+b
}
addts(5,5)

let user: {name: string, age: number, location: string} = {name: "Bob", age: 34, location: "Pune"}
console.log(user)