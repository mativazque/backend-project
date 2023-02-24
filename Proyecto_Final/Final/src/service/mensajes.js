import { mensajes } from "../model/mensajes/factoryMsj.js"
import { logger } from "../configs/loggers.js"

export class MensajesService {

    static async save(user) {
        try {
            return await mensajes.save(user)
        } catch (error) {
            logger.error(error)
        }
    }

    static async getAll() {
        try {
            return await mensajes.getAll()
        } catch (error) {
            logger.error(error)
        }
    }

    static async getByUsername(username) {
        try {
            return await mensajes.getByUser(username)
        } catch (error) {
            logger.error(error)
        }
    }
}

