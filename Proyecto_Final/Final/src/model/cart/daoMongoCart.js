import controllerMongo from "../../container/mongoDB.js"
import { cartSchema } from "../../schemas/mongo.js"


let instance = null

class daoMongoCarts extends controllerMongo {
    constructor() {
        super("carts", cartSchema)
    }

    static getInstance() {
        if (!instance) {
            instance = new daoMongoCarts()
        }
        return instance
    }

    async getByUser(user) {
        try {
            return await this.collection.findOne({ username: user })
        } catch (error) {
            this.logger.error(error)
        }
    }

    async deleteByUser(username) {
        try {
            return await this.collection.deleteOne({ username: username })
        } catch (error) {
            this.logger.error(error)
        }
    }

    async deleteProductCart(username, newProducts) {
        try {
            await this.collection.updateOne({ username: username }, { $set: { "productos": newProducts } })
        }
        catch (error) {
            this.logger.error(error)
        }
    }

    async updateProductCart(username, idProd, newQuantity) {
        try {
            await this.collection.updateOne(
                { username: username, "productos._id": this.ObjectId(idProd) },
                {
                    "$set": {
                        "productos.$.quantity": newQuantity
                    }
                }
            )
        } catch (error) {
            this.logger.error(error)
        }
    }

    async pushProduct(username, producto) {
        try {
            await this.collection.updateOne(
                { username: username },
                { $push: { productos: producto } }
            )
        } catch (error) {
            this.logger.error(error)
        }
    }
}

export default daoMongoCarts
