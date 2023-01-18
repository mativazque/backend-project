import { productosSchema } from "../../schemas/mongo.js"
import controllerMongo from "../../container/mongoDb/controllerGrl.js"


class daoMongoProducts extends controllerMongo {
    constructor() {
        super("productos", productosSchema)
    }
}

export default daoMongoProducts
