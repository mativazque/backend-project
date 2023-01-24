import {productos} from "../daos/factory.js"


export class RepoProductos {
    constructor() {
        this.productos = productos
    }

    async save(data) {
        return productos.save(data)
    }

    async getAll() {
        return productos.getAll()
        
    }

    async getById(id) {
        return productos.getById(id)
    }

    async deleteById(id) {
        return productos.deleteById(id)
    }
}


