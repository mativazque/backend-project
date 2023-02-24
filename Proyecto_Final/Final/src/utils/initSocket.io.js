import { Server as IoServer } from "socket.io"
import {httpServer} from "../../app.js"
import {MensajesService} from "../service/mensajes.js"
import { logger } from "../configs/loggers.js"


const io = new IoServer(httpServer)

const initSocket = () => {
    io.on("connection", async (socket) => {

        logger.info(`User id ${socket.id} connected`)

        socket.emit("mensajes", await MensajesService.getAll())

        socket.on("new-msj", async (newMsj) => {
            await MensajesService.save(newMsj)
            io.sockets.emit("mensajes", await MensajesService.getAll())
            logger.info(`New menssage in Chat Support`)
        })

        socket.on("disconnect", () => {
            logger.info(`User id ${socket.id} disconnected`)
        })
    })
}

export {initSocket}