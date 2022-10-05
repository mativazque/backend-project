const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io")

const app = express()

const Container = require("./controller/class")
const products = new Container("./data/products.txt")
const mensajes = new Container("./data/mensajes.txt")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set('view engine', "ejs")

const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)


io.on("connection", async (socket) => {
    console.log(`User id ${socket.id} connected`)

    try {
        socket.emit("productos", await products.getAll())
    } catch (err) {
        console.log(err)
    }

    socket.on("new-product", async (newProduct) => {
        await products.save(newProduct)
        io.sockets.emit("productos", await products.getAll())
    })

    try {
        socket.emit("mensajes", await mensajes.getAll())
    } catch (error) {
        console.log(error)
    }

    socket.on("new-msj", async (newMsj) => {
        await mensajes.save(newMsj)
        io.sockets.emit("mensajes", await mensajes.getAll())
    })

    socket.on('disconnect', () => {
        console.log(`kUser id ${socket.id} disconnected`);
    });
})

httpServer.listen(8080, () => {
    console.log("Server listening on Port 8080")
}).on('error', (err) => console.log(err))