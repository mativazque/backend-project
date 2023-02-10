import { Server as IoServer } from "socket.io"
import {httpServer} from "../../app.js"
import {mensajes} from "../model/mensajes/factoryMsj.js"

const io = new IoServer(httpServer)

const initSocket = () => {
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
}

export {initSocket}