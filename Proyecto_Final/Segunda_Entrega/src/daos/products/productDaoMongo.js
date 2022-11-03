import ControllerMongo from "../../controllers/controllerMongo.js"
import {Schema} from 'mongoose';

const product = new Schema({
    nombre: { type: "String", require: true, max: 60 },
    price: { type: "Number", require: true },
    thumbnail: { type: "String", require: true },
    price: { type: "Number", require: true },
    codigo: { type: "String", require: true },
    description: { type: "String", require: true, max: 60 },
    timestamp: { type: "String", require: true }
})



class mongoDaoProducts extends ControllerMongo {
    constructor() {
        super("productos", product)
    }
}


export default mongoDaoProducts;

