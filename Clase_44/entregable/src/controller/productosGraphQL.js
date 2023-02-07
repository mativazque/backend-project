import { ProductosService } from "../service/productos.js"

async function getProductos () {
    const productos = await ProductosService.readAll()
    return productos
}

async function createProducto (product) {
    console.log(product)
    const post =  await ProductosService.addProduct(product)
    const productpost =  await ProductosService.getById(post)
    console.log(productpost)
    return productpost
}

export {getProductos, createProducto}