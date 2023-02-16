import { cart } from "../model/cart/factoryCart.js"
import { productos } from "../model/producto/factoryProductos.js"
import { buys } from "../model/buy/factoryBuy.js"
import { createNewCart } from "../model/cart/dtoCart.js"
import { createNewBay } from "../model/buy/dtoBuy.js"
import { logger } from "../configs/loggers.js"


export class CartService {

    static async getByUser(username) {
        try {
            return await cart.getByUser(username)
        } catch (error) {
            logger.error(error)
        }
    }

    static createNewProductToCart(producto) {
        try {
            const { _id, title, price, thumbnail, quantity } = producto
            const newProduct = { _id, title, price, thumbnail, quantity }
            return newProduct
        } catch (error) {
            logger.error(error)
        }
    }

    static async create(username, idProduct, quantity) {
        try {
            const producto = await productos.getById(idProduct)
            const newProduct = this.createNewProductToCart({ ...producto._doc, quantity: quantity })
            const newCart = createNewCart(username, newProduct)
            const pushCart = await cart.save(newCart)
            return pushCart
        } catch (error) {
            logger.error(error)
        }
    }

    static async findProductCart(username, idProd) {
        try {
            const cart = await this.getByUser(username)
            const product = cart ? cart.productos.find(prod => prod._id == idProd) : false;
            return product
        } catch (error) {
            logger.error(error)
        }
    }

    static async addProduct(idProduct, username, quantity) {
        try {
            const producto = await productos.getById(idProduct)
            const newProductToCart = this.createNewProductToCart({ ...producto._doc, quantity: quantity })
            const pushNewProductToCart = await cart.pushProduct(username, newProductToCart)
            return pushNewProductToCart
        } catch (error) {
            logger.error(error)
        }
    }

    static async updateQuantityProductCart(username, idProd, quantity) {
        try {
            const productFound = await this.findProductCart(username, idProd)
            const newQuantity = productFound.quantity + quantity
            const update = await cart.updateProductCart(username, idProd, newQuantity)
            return update
        } catch (error) {
            logger.error(error)
        }
    }

    static async deleteProduct(username, idProd) {
        try {
            const cartFound = await this.getByUser(username)
            const newProducts = cartFound.productos.filter(item => item._id != idProd)
            const update = await cart.deleteProductCart(username, newProducts)
            return update
        } catch (error) {
            logger.error(error)
        }
    }

    static async deleteCart(username) {
        try {
            const deleteCart = await cart.deleteByUser(username)
            return deleteCart
        } catch (error) {
            logger.error(error)
        }
    }

    static async createBuy(username) {
        try {
            const cartFound = await this.getByUser(username)
            const totalBuy = cartFound.productos.reduce((acum, buy) => acum + buy.price * buy.quantity, 0)
            const newBuy = createNewBay(username, cartFound.productos, totalBuy)
            const saveBuy = await buys.save(newBuy)
            return saveBuy
        } catch (error) {
            logger.error(error)
        }
    }

    static async getBuyById(id) {
        try {
            return await buys.getById(id)
        } catch (error) {
            logger.error(error)
        }
    }

}

