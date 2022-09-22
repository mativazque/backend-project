const Container = require("./class")
const products = new Container("./products.txt")

const express = require('express')
const { Router } = express

const app = express()
const routerProducts = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on('Error', (err) => console.log(err))

routerProducts.get("/", async (req, res) => {
    try {
        const productos = await products.getAll()
        console.log(productos)
        res.json(productos)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

routerProducts.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        res.json(await products.getById(id))
    } catch (err) {
        console.log(err)
    }
})

routerProducts.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        res.send(await products.deleteById(id))
        console.log(await products.getAll())
    } catch (err) {
        console.log(err)
    }
})

routerProducts.post("/", async (req, res) => {
    const { title, price, thumbnail } = req.body
    const newProduct = {
        title: title,
        price: parseInt(price),
        thumbnail: thumbnail
    }
    try {
        res.json(await products.save(newProduct))
        console.log(await products.getAll())
    } catch (error) {
        console.log(error)
    }

})

routerProducts.put("/:id", async (req, res) => {
    const newProduct = req.body
    const id = parseInt(req.params.id)
    try {
        res.json(await products.refreshProduct(newProduct, id))
    } catch (error) {
        
    }
})


app.use("/api/productos", routerProducts)