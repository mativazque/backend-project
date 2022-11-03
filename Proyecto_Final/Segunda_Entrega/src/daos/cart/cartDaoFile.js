import ControllerArchivo from "../../controllers/controllerFile.js"
import config from "../../configs/configs.js"

class fileDaoCarts extends ControllerArchivo {
    constructor() {
        super(config.fileSystem.pathCart)
    }

    async deleteProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart)
            const newProducts = cartFound.productos.filter(prod => prod.id != idProd)
            cartFound.productos = newProducts
            await this.update(cartFound, idCart)
        } catch (error) {
            console.log(error)
        }
    }

    async findProduct(idCart, idProd) {
        try {
            const cartFound = await this.getById(idCart)
            const productFound = cartFound.productos.find(prod => prod.id == idProd)
            return productFound
        } catch (error) {
            console.log(error)
        }
    }
}


export default fileDaoCarts;

