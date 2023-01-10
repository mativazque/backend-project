import express from "express";
import { Server as HttpServer } from "http"
import { Server as IoServer } from "socket.io"
import session from "express-session"
import {initSocket} from "./src/utils/initSocket.io.js"
import mongoose from "mongoose"
import { initMongoDB } from "./src/utils/initMongoDB.js";
import routerProductsRandom from "./src/routs/web/productRandom.js"
import routerSession from "./src/routs/web/auth.js"
import routerWeb from "./src/routs/web/home.js"
import routerUser from "./src/routs/api/user.js"
import routerProductos from "./src/routs/api/productos.js"
import routerCreateProd from "./src/routs/api/createProducts.js"
import routerCart from "./src/routs/api/cart.js"
import routerInfo from "./src/routs/web/info.js"
import routerCounter from "./src/routs/web/count.js"
import routerUndefined from "./src/routs/web/undefined.js"
import config from "./src/configs/index.js"
import cluster from "cluster"
import {cpus} from "os" 
import compression from "compression"

import passport from "passport"
import initPassport from "./src/middleware/passport.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(compression())


initMongoDB(mongoose.connect)


initPassport()
app.use(session(config.session))
app.use(passport.initialize())
app.use(passport.session())


app.set("view engine", "ejs")
app.use("/api/productos-test", routerProductsRandom)
app.use("/", routerSession)
app.use("/", routerWeb)
app.use("/", routerUser)
app.use("/", routerProductos)
app.use("/", routerCreateProd)
app.use("/", routerCart)
app.use("/", routerInfo)
app.use("/", routerCounter)
app.use("/", routerUndefined)



// const httpServer = new HttpServer(app)

// const io = new IoServer(httpServer)
// initSocket(io)

if(config.MODE == "cluster" && cluster.isPrimary) {
    const numCPUs = cpus().length
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER: ${process.pid}`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on(("exit"), worker => {
        console.log(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`)
        cluster.fork()
    })
} else {
    process.on("exit", code => {
        console.log(`Salida con código de error: ${code}`)
    })
    app.listen(config.PORT, () => {
        console.log(`Server listening on PORT: ${config.PORT}, PID: ${process.pid}`)
    }).on('error', (err) => console.log(err))
    console.log(`proceso ${process.pid} escuchando en el puerto ${config.PORT}`)
}



