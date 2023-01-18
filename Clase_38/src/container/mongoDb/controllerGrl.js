import { model } from 'mongoose';
import { logger } from "../../loggers/config.js"


export default class ControllerMongo {
    constructor(collectionName, mongoSchema) {
        this.collection = model(collectionName, mongoSchema)
        this.logger = logger
    }

    //Yes
    async getAll() {
        try {
            return await this.collection.find({})
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    //Yes
    async getById(id) {
        try {
            return await this.collection.findOne({ _id: id })
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            const itemFound = await this.getById(id)
            if (itemFound) {
                await this.collection.deleteOne({ _id: id })
                return true
            } else {
                return false
            }
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    async update(element, id) {
        try {
            await this.collection.updateOne({ _id: id }, { $set: element })
        }
        catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }
}



