import mongoose from 'mongoose';
const { model } = mongoose;
import config from "./../configs/configs.js"

//Conection
try {
    await mongoose.connect(config.mongoDB.URL, config.mongoDB.other)
    console.log("Conected to MongoDB")
} catch (error) {
    console.log(error)

}

//Crud
class ControllerMongo {
    constructor(nameCollection, shema) {
        this.collection = model(nameCollection, shema)
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
            console.log(error)
        }
    }

    async getAll() {
        try {
            const data = await this.collection.find({})
            console.log(data)
            return data
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
            await this.collection.updateOne({ _id: id }, { $set: element})
        }
         catch(error) {
        console.log(error)
    }

}
}

// const newProducto = {
//     nombre: "Reglas",
//     price: 44,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//     stock: 434,
//     código: "DALSKFJLKASDJFLS",
//     description: "Esta será la description"
// }

// const productos = new ControllerMongo("productos", product)

// const ver = async () => {
//     await productos.update({nombre: "mochila"}, "6362a62128821e4ebb9a15f1")

// }

// // ver()

export default ControllerMongo