const express = require("express");
const {Server: HttpServer} = require("http") //Importo modulo http y cambio de nombre clase Server
const {Server: IoServer} = require("socket.io") //Importo modulo socket y cambio de nombre clase Server

const app = express()

const httpServer = new HttpServer(app) //Creo un server express dentro de http
const io = new IoServer(httpServer) //Creo un server socket.io dentro del server anterior

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

const port = 8080

let mensajes = []

httpServer.listen(port, () => {
    console.log("Server listening on PORT 8080")
})

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.emit("data", mensajes)

    socket.on("mensaje", (msj) => {
        mensajes.push({id: socket.id, mensaje: msj})
        io.sockets.emit("mensajes", mensajes)
    })


    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`)
    })
})