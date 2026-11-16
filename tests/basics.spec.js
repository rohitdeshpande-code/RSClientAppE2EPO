

let arr = [1,2,3,4]
arr[4] = 100
console.log(arr);

arr.push(200)
console.log(arr);

arr.pop(200)
console.log(arr);

arr.unshift(300)
console.log(arr);

arr.shift(300)
console.log(arr);


let mixedString = [1, "rohit", 3, "qa", 5.5]


mixedString.indexOf("qa")
console.log(mixedString.indexOf("qa"))
console.log(mixedString.slice(2,3))
mixedString.forEach((value,index) => {
    console.log(value)
})