import controllerMongo from "../../container/controllerMongo.js"
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
            this.logger.error(`Error: ${error}`)
        }
    }

    async deleteByUser(username) {
        try {
            return await this.collection.deleteOne({ username: username })
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    async deleteProductCart(username, newProducts) {
        try {
            await this.collection.updateOne({ username: username }, { $set: { "productos": newProducts } })
        }
        catch (error) {
            this.logger.error(`Error: ${error}`)
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
            console.log(error)
        }
    }

    async pushProduct(username, producto) {
        try {
            await this.collection.updateOne(
                { username: username },
                { $push: { productos: producto } }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export default daoMongoCarts
