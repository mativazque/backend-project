import mongoose from 'mongoose';
import { buySchema } from "../schemas/mongo.js"
const { model} = mongoose;
import {ObjectId} from "mongodb"
import { logger } from "./../api/logger.js"


export default class ControllerMongo {
    constructor() {
        this.collection = model("buys", buySchema)
        this.logger = logger,
        this.ObjectId = ObjectId
    }

    async save(data) {
        console.log(data)
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

    async getByUser(user) {
        try {
            const itemFound = await this.collection.findOne({ username: user })
            return itemFound
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
}



