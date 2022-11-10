import mongoose from 'mongoose';
import config from "./../configs/configs.js"
import { normalize, denormalize } from "normalizr"
import { mensajesNormalized } from "./../schemas/normalizer.js"
import { mensajeSchema } from "./../schemas/mongo.js"

const { model, Schema } = mongoose

try {
    await mongoose.connect(config.mongoDB.URL, config.mongoDB.other)
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error)
}

export default class controllerMsg {
    constructor() {
        this.collection = model("mensajes", mensajeSchema)
        this.normalize = normalize
        this.denormalize = denormalize
        this.squemaMsj = mensajesNormalized
    }

    async getAll() {
        try {
            const data = await this.collection.find({})
            const reData = data.map(item => {
                return ({
                    _id: item._id.toString(),
                    author: item.author,
                    text: item.text,
                    fecha: item.fecha
                })
            })
            const newData = { id: 9999, mensajes: reData }
            return newData
        } catch (error) {
            console.log(error)
        }
    }

    async save(data) {
        try {
            const newItem = new this.collection(data)
            await newItem.save()
            console.log("Item guardado exitosamente")
        } catch (error) {
            console.log(error)
        }
    }

    
    async normalizar() {
        try {
            const data = await this.getAll()
            const dataNormalized = this.normalize(data, this.squemaMsj)
            return dataNormalized
        } catch (error) {
            console.log(error)
        }
    }

    async desnormalizar() {
        try {
            const dataNormalized = await this.normalizar()
            const dataDesnormalized = this.denormalize(
                dataNormalized.result,
                this.squemaMsj,
                dataNormalized.entities)
            return dataDesnormalized
        } catch (error) {
            console.log(error)
        }
    }
}



