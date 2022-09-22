const express = require('express');

const app = express()

const server = app.listen(8080, () => {
    console.log(`Server listening on PORT 8080`)
}).on("Error", error => console.log(error))

app.get("/api/sumar/:num1/:num2", (req, res) => {
    const {num1, num2} = req.params
    res.json({resultado: parseInt(num1) + parseInt(num2)})
})

app.get("/api/sumar", (req, res) => {
    const {numA, numB} = req.query
    res.json({resultado: parseInt(numA) + parseInt(numB)})
})

app.get("/api/operacion/:numbers", (req, res) => {
    const {numbers} = req.params
    let newNumbers = numbers.split("+")
    const arrayFinal = newNumbers.map(num => parseInt(num))
    const resultado = arrayFinal.reduce((acc, num) => acc + num, 0)
    res.json({resultado: resultado})
})

app.post("/api", (req, res) => {
    console.log("Post ok")
})

app.delete("/api", (req, res) => {
    console.log("delete ok")
})

app.put("/api", (req, res) => {
    console.log("put ok")
})

