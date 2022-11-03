import ControllerMongo from "../../controllers/controllerMongo.js"
import { Schema } from 'mongoose';

const cart = new Schema({
    timestamp: { type: "String", require: true },
    productos: { type: "Object", require: true }
})



class mongoDaoCarts extends ControllerMongo {
    constructor() {
        super("carrito", cart)
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

    async findProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart)
            const productFound = cartFound.productos.find(prod => prod._id == idProd)
            return productFound
        } catch (error) {
            console.log(error)
        }
    }
}


export default mongoDaoCarts;

