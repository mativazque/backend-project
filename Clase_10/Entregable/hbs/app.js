const Container = require("./class")
const products = new Container("./products.txt")

const express = require('express')
const hbs = require("express-handlebars")
const { Router } = express

const app = express()
const routerProducts = Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", express.static(__dirname + "/public"))


app.engine(
    "hbs",
    hbs.engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials"
    })
)

app.set("view engine", "hbs")
app.set("views", "./views")

routerProducts.get("/", async (req, res) => {
    try {
        const productos = await products.getAll()
        const render = productos.length > 0 ? true : false
        res.render("products", { productos, render })
    } catch (error) {
        console.log(error)
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
        await products.save(newProduct)
    } catch (error) {
        console.log(error)
    }
    res.redirect("/api/productos")
})


app.use("/api/productos", routerProducts)


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on('Error', (err) => console.log(err))
