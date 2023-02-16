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
}

export default daoMongoMensajes
