import { usersSchema } from "../../schemas/mongo.js"
import controllerMongo from "../../container/mongoDb/controllerGrl.js"

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

    //yes
    async getByUser(username) {
        try {
            return await this.collection.findOne({ username: username })
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }
}

export default daoMongoUsers
