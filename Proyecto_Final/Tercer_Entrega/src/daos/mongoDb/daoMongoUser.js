import { usersSchema } from "../../schemas/mongo.js"
import controllerMongo from "../../controllers/mongoDb/controllerGrl.js"

class daoMongoUsers extends controllerMongo {
    constructor() {
        super("users", usersSchema)
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

    async getByUsername(username) {
        try {
            const itemFound = await this.collection.findOne({ username: username })
            return itemFound
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }
}

export default daoMongoUsers
