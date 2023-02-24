import { model } from 'mongoose';
import { logger } from "../configs/loggers.js"
import { ObjectId } from "mongodb"


export default class ControllerMongo {
    constructor(collectionName, mongoSchema) {
        this.collection = model(collectionName, mongoSchema)
        this.logger = logger
        this.ObjectId = ObjectId
    }

    async save(data) {
        try {
            const newItem = new this.collection(data)
            const result = await newItem.save()
            const idItem = result._id.toString()
            return idItem
        } catch (error) {
            this.logger.error(error)
        }
    }

    async getAll() {
        try {
            return await this.collection.find({})
        } catch (error) {
            this.logger.error(error)
        }
    }

    async getById(id) {
        try {
            return await this.collection.findOne({ _id: this.ObjectId(id) })
        } catch (error) {
            this.logger.error(error)
        }
    }

    async deleteById(id) {
        try {
            return await this.collection.deleteOne({ _id: this.ObjectId(id) })
        }
        catch (error) {
            this.logger.error(error)
        }
    }
}



