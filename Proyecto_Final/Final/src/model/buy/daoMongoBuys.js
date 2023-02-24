import controllerMongo from "../../container/mongoDB.js"
import { buySchema } from "../../schemas/mongo.js"

let instance = null

class daoMongoBuys extends controllerMongo {
    constructor() {
        super("buys", buySchema)
    }

    static getInstance() {
        if (!instance) {
            instance = new daoMongoBuys()
        }
        return instance
    }
    
    async getByUser(username) {
        try {
            return await this.collection.findOne({ username: username })
        } catch (error) {
            this.logger.error(error)
        }
    }

}

export default daoMongoBuys