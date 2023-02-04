import { productosSchema } from "../../schemas/mongo.js"
import controllerMongo from "../../container/controllerMongo.js"

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

    async updateProduct(id, newProduct) {
        try {
            return await this.collection.updateOne(
                { _id: this.ObjectId(id) },
                { $set: newProduct }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export default daoMongoProducts
