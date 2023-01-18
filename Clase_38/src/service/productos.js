import { productos } from "../daos/index.js"

export class ProductosService {

    static async readAll() {
        try {
            return await productos.getAll()
        } catch (error) {
            console.log(error)
        }
    }
}
