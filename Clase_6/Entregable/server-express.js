const Container = require("./class")
const express = require('express')

const app = express()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server listening on PORT ${server.address().port}`)
})

server.on('error', error => console.log(`Error server:`, error))

const products = new Container ("./products.txt")

app.get('/', async (req, res) => {
    try {
        res.send(`<h1> Bienvenid@s al servidor de Matias Vazquez </h1>`)
    } catch (err) {
        console.log(err)
    }
})

app.get('/productos', async (req, res) => {
    await products.getAll()
    .then(response => res.send(response))
    .catch((err)=>console.log("Error", err))
})

app.get('/productoRandom', async (req, res) => {
    await products.productRandom()
    .then(response => res.send(response))
    .catch((err)=>console.log("Error", err))
})







