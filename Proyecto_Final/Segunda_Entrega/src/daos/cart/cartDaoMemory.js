import ControllerMemory from "./../../controllers/controllerMemory.js"

class memoryDaoCarts extends ControllerMemory {
    constructor() {
        super()
    }

    async deleteProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart)
            const newProducts = cartFound.productos.filter(prod => prod.id != Number(idProd))
            cartFound.productos = newProducts
            await this.update(cartFound, idCart)
        } catch (error) {
            console.log(error)
        }
    }

    async findProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart)
            const productFound = cartFound.productos.find(prod => prod.id === Number(idProd))
            return productFound
        } catch (error) {
            console.log(error)
        }
    }
}


export default memoryDaoCarts;

