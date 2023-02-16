import { usersSchema } from "../../schemas/mongo.js"
import controllerMongo from "../../container/mongoDB.js"

let instance = null

class daoMongoUsers extends controllerMongo {
    constructor() {
        super("users", usersSchema)
    }

    static getInstance() {
        if (!instance) {
            instance = new daoMongoUsers()
        }
        return instance
    }

    async getByUser(username) {
        try {
            this.logger.info("Method GetByUser successful - MongoDB")
            return await this.collection.findOne({ username: username })
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }
}

export default daoMongoUsers
