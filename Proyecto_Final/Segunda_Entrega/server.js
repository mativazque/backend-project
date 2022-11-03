import express from 'express'
import {routerProducts, routerCart} from "./src/routs/routs.js"


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/api/productos", routerProducts)
app.use("/api/carrito", routerCart)


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on("Not Found", () => {console.log("Error en el server")})