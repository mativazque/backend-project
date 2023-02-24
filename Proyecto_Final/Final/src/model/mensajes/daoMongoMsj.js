import controllerMongo from "../../container/mongoDB.js"
import { mensajeSchema } from "../../schemas/mongo.js"

let instance = null

class daoMongoMensajes extends controllerMongo {
    constructor() {
        super("mensajes", mensajeSchema)
    }

    static getInstance() {
        if (!instance) {
            instance = new daoMongoMensajes()
        }
        return instance
    }

    async getByUser(user) {
        try {
            return await this.collection.find({ username: user })
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default daoMongoMensajes
