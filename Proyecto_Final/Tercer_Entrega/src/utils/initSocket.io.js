import { mensajes } from "../api/mensajes.js"
import { productos } from "../api/productos.js"

export const initSocket = (io) => {
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
}