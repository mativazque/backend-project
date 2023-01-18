import { model } from 'mongoose';
import { logger } from "../../loggers/config.js"


export default class ControllerMongo {
    constructor(collectionName, mongoSchema) {
        this.collection = model(collectionName, mongoSchema)
        this.logger = logger
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

    async getAll() {
        try {
            return await this.collection.find({})
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    async getById(id) {
        try {
            return await this.collection.findOne({ _id: id })
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            return await this.collection.deleteOne({ _id: id })
        }
        catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }
}



