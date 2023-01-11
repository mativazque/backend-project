import mongoose from 'mongoose';
import { cartSchema } from "../schemas/mongo.js"
const { model} = mongoose;
import {ObjectId} from "mongodb"
import { logger } from "./../api/logger.js"


export default class ControllerMongo {
    constructor() {
        this.collection = model("carts", cartSchema)
        this.logger = logger,
        this.ObjectId = ObjectId
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

    async getByUser(user) {
        try {
            const itemFound = await this.collection.findOne({ username: user })
            return itemFound
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    async deleteByUser(username) {
        try {
            const itemFound = await this.getByUser(username)
            if (itemFound) {
                const deleteItem = await this.collection.deleteOne({ username: username})
                console.log(deleteItem)
            } else {
                return false
            }
        } catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    async updateProductos(username, productos) {
        try {
            await this.collection.updateOne({ username: username }, { $set: {"productos": productos} })
        }
        catch (error) {
            this.logger.error(`Error: ${error}`)
        }
    }

    async deleteProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart)
            const newProducts = cartFound.productos.filter(prod => prod._id != idProd)
            cartFound.productos = newProducts
            await this.update(cartFound, idCart)
        } catch (error) {
            console.log(error)
        }
    }

    async findQuantityProduct(username, idProd) {
        try {
            const cartFound = await this.getByUser(username)
            const productFound = cartFound 
            ? cartFound.productos.find(prod => prod._id == idProd) : false;
            return productFound
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(username, idProd, quantity) {
        try {
            const quantitySaved = await this.findQuantityProduct(username, idProd)
            const newQuantity = Number(quantitySaved.quantity) + Number(quantity)
            await this.collection.updateOne(
                { username: username, "productos._id": this.ObjectId(idProd) },
                {
                    "$set": {
                        "productos.$.quantity": newQuantity
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async addProduct(username, producto) {
        try {
            await this.collection.updateOne(
                {username: username},
                {$push: {productos: producto}}
            )
        } catch (error) {
            console.log(error)
        }
    }
    
}



