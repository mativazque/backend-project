import ControllerArchivo from "./../../controllers/controllerArchivo.js"
import config from "./../../configs/configs.js"

class fileDaoProducts extends ControllerArchivo {
    constructor() {
        super(config.fileSystem.pathProductos)
    }
}


export default fileDaoProducts;

