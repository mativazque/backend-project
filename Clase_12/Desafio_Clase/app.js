const express = require("express");
const {Server: HttpServer} = require("http") 
const {Server: IoServer} = require("socket.io") 

const app = express()

const httpServer = new HttpServer(app) 
const io = new IoServer(httpServer)

const port = 8080

const mensajes = [{nombre: "Matias", texto: "Hola, cómo estás?"}]

app.use(express.static("public"))

io.on("connection", (client) => {
    client.emit("mensajes", mensajes)

    client.on("nuevo-msj", (data) => {
        mensajes.push(data)
        io.sockets.emit("mensajes", mensajes)
    })

    client.on("disconnect", () => {
        console.log(`User ${client.id} disconnected`)
    })

})



httpServer.listen(port, () => {
    console.log("Server listening on PORT 8080")
})



