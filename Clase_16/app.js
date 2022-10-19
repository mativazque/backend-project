const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set('view engine', "ejs")

const httpServer = new HttpServer(app)
const io = new IoServer(httpServer)

const { option } = require("./db/config")

const knex = require("knex")
const knexSql= knex(option.mysql)
const knexSqLite= knex(option.sqlite)


const ContainerProductos = require("./db/productos")
const ContainerMsj = require("./db/mensajes")
const mensajes = new ContainerMsj(knexSqLite, "mensajes")
const productos = new ContainerProductos(knexSql, "productos")


io.on('connection', async (socket) => {
    console.log(`User id ${socket.id} connected`)

    socket.emit("productos", await productos.getAll())

    socket.on("new-product", async (newProduct) => {
        await productos.save(newProduct)
        io.sockets.emit("productos", await productos.getAll())
    })

    socket.emit("mensajes", await mensajes.getAll())

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

