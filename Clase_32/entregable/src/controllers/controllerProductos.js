import mongoose from 'mongoose';
import { productosSchema } from "../schemas/mongo.js"
const { model, Schema } = mongoose;
import { logger } from "./../api/logger.js"


export default class ControllerMongo {
    constructor() {
        this.collection = model("productos", productosSchema)
        this.logger = logger
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

    async getAll() {
        try {
            const data = await this.collection.find({})
            return data
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }

    }

    async getById(id) {
        try {
            const itemFound = await this.collection.findOne({ _id: id })
            if (itemFound) {
                return itemFound
            } else {
                return NaN;
            }

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



