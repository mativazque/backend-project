import express from "express";
import { Server as HttpServer } from "http"
import { Server as IoServer } from "socket.io"
import { routerProducts } from "./src/routs/routs.js"
import controllerMsg from "./src/controllers/controllerMsg.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.use("/api/productos-test", routerProducts)

const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

const mensajes = new controllerMsg()

io.on("connection", async (socket) => {
    console.log(`User id ${socket.id} connected`)

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
