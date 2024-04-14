const fs = require('fs')

setImmediate(()=>{
    console.log("setImmediate")
})

setTimeout(()=>{
    console.log("SetTimeout with 0 second delay")
},0)


// poll
fs.readFile('demo.txt',"utf-8",()=>{
    console.log("Io polling finished")
})

let data = fs.readFileSync("demo.txt");
console.log(data,"data")


console.log("Hello from top level code")






