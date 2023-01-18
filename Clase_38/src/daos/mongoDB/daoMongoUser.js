import { usersSchema } from "../../schemas/mongo.js"
import controllerMongo from "../../container/mongoDb/controllerGrl.js"

class daoMongoUsers extends controllerMongo {
    constructor() {
        super("users", usersSchema)
    }

    async getByUser(username) {
        try {
            return await this.collection.findOne({ username: username })
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }
}

export default daoMongoUsers
