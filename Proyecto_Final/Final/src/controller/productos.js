import { ProductosService } from "../service/productos.js"
import {logger, viewUrl} from "../configs/loggers.js"

async function getAllProductos (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const productos = await ProductosService.readAll()
    res.status(200).json({productos: productos})
}

async function postProducto (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const post = await ProductosService.addProduct(req.body)
    console.log(post)
    res.status(200).json({respuest: "Producto guardado exitosamente"})
}

async function getProductById (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const productFound = await ProductosService.getById(req.params.id)
    productFound ? res.status(200).json(productFound) : 
    res.status(406).json({respuest: `No existe un producto con ID: ${req.params.id}`})
}

async function getProductsByCat (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const productsFound = await ProductosService.getByCat(req.params.cat)
    productsFound ? res.status(200).json(productsFound) : 
    res.status(406).json({respuest: `No existen productos con categoria: ${req.params.cat}`})
}

async function deleteProduct (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const productDelete = await ProductosService.deleteById(req.params.id)
    productDelete > 0 ? res.status(200).json({respuest: "Item eliminado exitosamente"}) : 
    res.status(406).json({respuest: `No existe un producto con ID: ${req.params.id}`})
}

async function updateProduct (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const productUpdate = await ProductosService.updateById(req.params.id, req.body)
    productUpdate ? res.status(200).json({respuest: "Item actualizado exitosamente"}) : 
    res.status(406).json({respuest: `No existe un producto con ID: ${req.params.id}`})
}


export {getAllProductos, postProducto, getProductById, getProductsByCat, deleteProduct, updateProduct}










