import { productosSchema } from "../../schemas/mongo.js"
import controllerMongo from "../../container/mongoDb/controllerGrl.js"


class daoMongoProducts extends controllerMongo {
    constructor() {
        super("productos", productosSchema)
    }

    async save(data) {
        const date = new Date().toLocaleString()
        const newData = { ...data, timestamp: date }
        try {
            const newItem = new this.collection(newData)
            const result = await newItem.save()
            const idItem = result._id.toString()
            return idItem
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

}

export default daoMongoProducts
