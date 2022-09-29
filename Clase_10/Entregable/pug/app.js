const Container = require("./class")
const products = new Container("./products.txt")

const express = require('express')
const { Router } = express

const app = express()
const homeRouter = Router()
const productRouter = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("views engine", "pug")
app.set("views", "./views")

homeRouter.get("/", (req, res) => {
    res.render("home.pug")
})

productRouter.get("/", async (req, res) => {
    try {
        const productos = await products.getAll()
        const render = productos.length > 0 ? true : false
        res.render("productos.pug", {productos, render})
        
    } catch (error) {
        console.log(error)
    }
})

productRouter.post("/", async (req, res) => {
    try {
        await products.save(req.body)
        res.redirect("../api/productos")
        
    } catch (error) {
        
    }
    

})

app.use("/api", homeRouter)
app.use("/api/productos", productRouter) 

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on('Error', (err) => console.log(err))
