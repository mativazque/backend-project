import mongoose from 'mongoose';
import { usersSchema } from "../schemas/mongo.js"
const { model, Schema } = mongoose;
import bCrypt from "bcrypt"


export default class ControllerMongo {
    constructor() {
        this.collection = model("users", usersSchema)
        this.hashSync = bCrypt.hashSync
        this.genSaltSync = bCrypt.genSaltSync
    }

    createHash(password) {
        return this.hashSync(
            password,
            this.genSaltSync(10),
            null
        )
    }

    async save(data) {
        const passwordHash = this.createHash(data.password)
        const newData = { ...data, password: passwordHash }
        try {
            const newItem = new this.collection(newData)
            const result = await newItem.save()
            const idItem = result._id.toString()
            return idItem
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const data = await this.collection.find({})
            return data
        } catch (error) {
            console.log(error)
        }

    }

    async getByUsername(username) {
        try {
            const itemFound = await this.collection.findOne({ username: username })
            if (itemFound) {
                return itemFound
            } else {
                return NaN;
            }

        } catch (error) {
            console.log(error)
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
            console.log(error)
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
            console.log(error)
        }
    }

    async update(element, id) {
        try {
            await this.collection.updateOne({ _id: id }, { $set: element })
        }
        catch (error) {
            console.log(error)
        }

    }
}

