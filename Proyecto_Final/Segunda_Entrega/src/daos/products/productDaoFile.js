import ControllerArchivo from "../../controllers/controllerFile.js"
import config from "../../configs/configs.js"

class fileDaoProducts extends ControllerArchivo {
    constructor() {
        super(config.fileSystem.pathProductos)
    }
}


export default fileDaoProducts;

