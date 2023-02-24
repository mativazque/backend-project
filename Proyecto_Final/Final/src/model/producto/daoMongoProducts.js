import { productosSchema } from "../../schemas/mongo.js"
import controllerMongo from "../../container/mongoDB.js"

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

    async getByCategory(cat) {
        try {
            return await this.collection.find({category: cat})
        } catch (error) {
            this.logger.error(error)
        }
    }

    async updateProduct(id, newProduct) {
        try {
            return await this.collection.updateOne(
                { _id: this.ObjectId(id) },
                { $set: newProduct }
            )
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default daoMongoProducts
