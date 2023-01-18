import controllerMongo from "../../container/mongoDb/controllerGrl.js"
import { buySchema } from "../../schemas/mongo.js"

class daoMongoBuys extends controllerMongo {
    constructor() {
        super("buys", buySchema)
    }
    
    async getByUser(username) {
        try {
            return await this.collection.findOne({ username: username })
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

}

export default daoMongoBuys