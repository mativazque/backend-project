import controllerMongo from "../../container/mongoDb/controllerGrl.js"
import { cartSchema } from "../../schemas/mongo.js"
import { ObjectId } from "mongodb"

class daoMongoCarts extends controllerMongo {
    constructor() {
        super("carts", cartSchema)
        this.ObjectId = ObjectId
    }


    async save(data) {
        try {
            const newItem = new this.collection(data)
            const result = await newItem.save()
            const idItem = result._id.toString()
            return idItem
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
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
            const deleteItem = await this.collection.deleteOne({ username: username })
            return deleteItem
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
