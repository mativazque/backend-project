import { RepoProductos } from "../model/producto/repositoryProductos.js"

const productos = new RepoProductos()

export class ProductosService {

    static async readAll() {
        try {
            return await productos.getAll()
        } catch (error) {
            console.log(error)
        }
    }
}
