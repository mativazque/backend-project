import express from 'express'
import {routerProducts} from "./src/routs/ruthProd.js"


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/api/productos", routerProducts)


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on("Not Found", () => {console.log("Error en el server")})