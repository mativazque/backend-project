import { productos } from "../model/producto/factoryProductos.js"
import { createNewProduct } from "../model/producto/dtoProduct.js"
import {logger} from "../configs/loggers.js"



export class ProductosService {

    static async readAll() {
        try {
            return await productos.getAll()
        } catch (error) {
            logger.error(error)
        }
    }

    static async addProduct(product) {
        try {
            const newProduct = createNewProduct(product)
            return await productos.save(newProduct)
        } catch (error) {
            logger.error(error)
        }
    }

    static async getById(id) {
        try {
            return await productos.getById(id)
        } catch (error) {
            logger.error(error)
        }
    }

    static async getByCat(cat) {
        try {
            return await productos.getByCategory(cat)
        } catch (error) {
            logger.error(error)
        }
    }

    static async deleteById(id) {
        try {
            const deleteProduct = await productos.deleteById(id)
            return deleteProduct.deletedCount
        } catch (error) {
            logger.error(error)
        }
    }

    static async updateById(id, product) {
        try {
            const newProduct = createNewProduct(product)
            return await productos.updateProduct(id, newProduct)
        } catch (error) {
            logger.error(error)
        }
    }
}

