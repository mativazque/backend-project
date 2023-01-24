import { productosSchema } from "../../../schemas/mongo.js"
import controllerMongo from "../../container/mongoDb/controllerGrl.js"

let instance = null


class daoMongoProducts extends controllerMongo {
    constructor() {
        super("productos", productosSchema)
    }

    static getInstance() {
        if (!instance) {
            instance = new daoMongoProducts()
        }
        return instance
    }

}

export default daoMongoProducts
