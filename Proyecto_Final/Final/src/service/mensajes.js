import { normalize, denormalize } from "normalizr"
import { mensajes } from "../model/mensajes/factoryMsj.js"
import { mensajesNormalized } from "../schemas/normalizer.js"
import {logger} from "../configs/loggers.js"

export class MensajesService {

    static async save(user) {
        return await mensajes.save(user)
    }

    static async getAllAndRewrite() {
        try {
            const data = await mensajes.getAll()
            const reData = data.map(item => {
                return ({
                    _id: item._id.toString(),
                    author: item.author,
                    text: item.text,
                    fecha: item.fecha
                })
            })
            const newData = { id: 9999, mensajes: reData }
            return newData
        } catch (error) {
            logger.error(error)
        }
    }

    static async normalizar() {
        try {
            const data = await this.getAllAndRewrite()
            const dataNormalized = normalize(data, mensajesNormalized)
            return dataNormalized
        } catch (err) {
            logger.error(err)
        }
    }

    static async desnormalizar() {
        try {
            const dataNormalized = await this.normalizar()
            const dataDesnormalized = denormalize(
                dataNormalized.result,
                this.squemaMsj,
                dataNormalized.entities)
            return dataDesnormalized
        } catch (error) {
            logger.error(error)
        }
    }
    
}

