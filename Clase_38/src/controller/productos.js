import { ProductosService } from "../service/productos.js"
import {logger, viewUrl} from "../loggers/config.js"

async function getAllProductos (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const productos = await ProductosService.readAll()
    res.json({productos: productos})
}

export {getAllProductos}










