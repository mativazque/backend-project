import controllerMongo from "../../controllers/mongoDb/controllerGrl.js"
import { buySchema } from "../../schemas/mongo.js"

class daoMongoBuys extends controllerMongo {
    constructor() {
        super("buys", buySchema)
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

    async getByUser(user) {
        try {
            const itemFound = await this.collection.findOne({ username: user })
            return itemFound
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

}

export default daoMongoBuys