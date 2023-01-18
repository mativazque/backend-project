import { cart } from "../daos/index.js"
import { productos } from "../daos/index.js"

export class CartService {

    static async getByUser(username) {
        return await cart.getByUser(username)
    }

    static async create(username, idProduct, quantity) {
        const producto = await productos.getById(idProduct)
        const newProduct = { ...producto._doc, quantity: quantity }
        const newCart = {
            username: username,
            productos: [newProduct],
            timestamp: new Date().toLocaleString()
        }
        const pushCart = await cart.save(newCart)
        return pushCart
    }

    static async findProductCart(username, idProd) {
        const cart = await this.getByUser(username)
        const product = cart ? cart.productos.find(prod => prod._id == idProd) : false;
        return product
    }

    static async addProduct(idProduct, username, quantity) {

        const producto = await productos.getById(idProduct)
        const newProductToCart = { ...producto._doc, quantity: quantity }
        const pushNewProductToCart = await cart.pushProduct(username, newProductToCart)
        return pushNewProductToCart

    }

    static async updateQuantityProductCart(username, idProd, quantity) {
        const productFound = await this.findProductCart(username, idProd)
        const newQuantity = productFound.quantity + quantity
        const update = await cart.updateProductCart(username, idProd, newQuantity)
        return update
    }

    static async deleteProduct(username, idProd) {
        const cartFound = await this.getByUser(username)
        const newProducts = cartFound.productos.filter(item => item._id != idProd)
        const update = await cart.deleteProductCart(username, newProducts)
        return update
    }

    static async deleteCart(username) {
        const deleteCart = await cart.deleteByUser(username)
        return deleteCart
    }
}

