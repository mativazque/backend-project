import { productos } from "../model/producto/factoryProductos.js"
import { createNewProduct } from "../model/producto/dtoProduct.js"


export class ProductosService {

    static async readAll() {
        try {
            return await productos.getAll()
        } catch (error) {
            console.log(error)
        }
    }

    static async addProduct(product) {
        try {
            const newProduct = createNewProduct(product)
            return await productos.save(newProduct)
        } catch (error) {
            console.log(error)
        }
    }

    static async getById(id) {
        try {
            return await productos.getById(id)
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteById(id) {
        try {
            const deleteProduct = await productos.deleteById(id)
            return deleteProduct.deletedCount
        } catch (error) {
            console.log(error)
        }
    }

    static async updateById(id, product) {
        try {
            const newProduct = createNewProduct(product)
            return await productos.updateProduct(id, newProduct)
        } catch (error) {
            console.log(error)
        }
    }
}

