import { cart, productos, buys, } from "../model/daos/factory.js"
import { createNewCart } from "../model/dto/dtoNewCart.js"
import { createNewBay } from "../model/dto/dtoNewBuy.js"

export class CartService {

    static async getByUser(username) {
        return await cart.getByUser(username)
    }

    static createNewProductToCart(producto) {
        const { _id, title, price, thumbnail, quantity } = producto
        const newProduct = { _id, title, price, thumbnail, quantity }
        return newProduct
    }

    static async create(username, idProduct, quantity) {
        const producto = await productos.getById(idProduct)
        const newProduct = this.createNewProductToCart({ ...producto._doc, quantity: quantity })
        const newCart = createNewCart(username, newProduct)
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
        const newProductToCart = this.createNewProductToCart({ ...producto._doc, quantity: quantity })
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

    static async createBuy(username) {
        const cartFound = await this.getByUser(username)
        const totalBuy = cartFound.productos.reduce((acum, buy) => acum + buy.price * buy.quantity, 0)
        const newBuy = createNewBay(username, cartFound.productos, totalBuy)
        const saveBuy = await buys.save(newBuy)
        return saveBuy
    }

    static async getBuyById(id) {
        return await buys.getById(id)
    }

}

