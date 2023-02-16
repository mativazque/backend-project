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
            this.logger.info("Method GetByCategory successful - MongoDB")
            return await this.collection.find({category: cat})
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, newProduct) {
        try {
            this.logger.info("Method UpdateProduct successful - MongoDB")
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
