const express = require('express');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const {routProducts} = require("./routs/products")
const {routCarts} = require("./routs/carts")

app.use("/api/productos", routProducts)
app.use("/api/carrito", routCarts)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on("Not Found", () => {console.log("Error en el server")})