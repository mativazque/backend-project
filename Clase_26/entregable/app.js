import express from "express";
import { Server as HttpServer } from "http"
import { Server as IoServer } from "socket.io"
import session from "express-session"
import { mensajes } from "./src/api/mensajes.js"
import { productos } from "./src/api/productos.js"
import routerProducts from "./src/routs/web/productRandom.js"
import routerSession from "./src/routs/web/auth.js"
import routerWeb from "./src/routs/web/home.js"
import routerUser from "./src/routs/api/user.js"
import config from "./src/configs/configs.js" //Para inicializar el Server MongoDB

import passport from "passport"
import initPassport from "./src/middleware/passport.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


initPassport()
app.use(session({
    secret: 'secreto',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 10
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.set("view engine", "ejs")
app.use("/api/productos-test", routerProducts)
app.use("/", routerSession)
app.use("/", routerWeb)
app.use("/", routerUser)


const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)


io.on("connection", async (socket) => {
    console.log(`User id ${socket.id} connected`)

    socket.emit("productos", await productos.getAll())

    socket.on("new-product", async (newProduct) => {
        await productos.save(newProduct)
        io.sockets.emit("productos", await productos.getAll())
    })

    socket.emit("mensajes", await mensajes.normalizar())

    socket.on("new-msj", async (newMsj) => {
        await mensajes.save(newMsj)
        io.sockets.emit("mensajes", await mensajes.normalizar())
    })

    socket.on("disconnect", () => {
        console.log(`User id ${socket.id} disconnected`)
    })
})


httpServer.listen(8080, () => {
    console.log("Server listening on PORT 8080")
}).on('error', (err) => console.log(err))

