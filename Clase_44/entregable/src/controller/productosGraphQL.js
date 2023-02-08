import { ProductosService } from "../service/productos.js"
import { logger, viewUrl } from "../configs/loggers.js"
import { getAllProductos } from "./productos.js"

async function getProductos() {
    logger.info(`Ruth: http://localhost:8080/graphql GraphQL`)
    const productos = await ProductosService.readAll()
    return productos
}

async function createProducto(product) {
    logger.info(`Ruth: http://localhost:8080/graphql GraphQL`)
    const post = await ProductosService.addProduct(product)
    const productpost = await ProductosService.getById(post)
    return productpost
}

async function getProducto(data) {
    logger.info(`Ruth: http://localhost:8080/graphql GraphQL`)
    const productFound = await ProductosService.getById(data._id)
    if (!productFound) {
        return { Error: `No existe un producto con Id ${data._id}` }
    } else {
        return productFound
    }
}

async function updateProducto(prod) {
    logger.info(`Ruth: http://localhost:8080/graphql GraphQL`)
    const update = await ProductosService.updateByID(prod)
    const productUpdate = await ProductosService.getById(prod._id)
    if (!update) {
        return { Error: `No existe un producto con Id ${prod._id}` }
    } else {
        return productUpdate
    }
}

async function deleteProducto(data) {
    logger.info(`Ruth: http://localhost:8080/graphql GraphQL`)
    const productDelete = await ProductosService.getById(data._id)
    const deleteProd = await ProductosService.deleteById(data._id)
    if (deleteProd > 0) {
        return productDelete
    } else {
        return { Error: `No existe un producto con Id ${data._id}` }
    }
}


export { getProductos, createProducto, getProducto, updateProducto, deleteProducto }




// update
// mutation {
//     updateProducto(
//      _id: "63e3c0da42ab878ede52162b",
//      title: "Regla YY",
//      price: 350,
//      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
//    ) {
//      _id,
//      title,
//      price,
//      thumbnail,
//      timestamp
//     }
//    }

// getByID
// query {
//     getProducto(_id:"63b495ac4207eabd4a000fcc")
//     {
//       _id,
//       title,
//       price,
//       thumbnail,
//       timestamp
//     }
//   }

// getAll
// query {
//     getProductos{
//       _id,
//       title,
//       price,
//       thumbnail,
//       timestamp
//     }
//   }

// Delete
// mutation {
//     deleteProducto(_id: "63e3d8d96a33b3689fad5b8f") {
//      _id,
//      title,
//      price,
//      thumbnail,
//      timestamp
//     }
//    }

// Create
// mutation {
//     createProducto(title: "Regla Z",
//     price: 30,
//     thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
//     ) {
//      _id,
//      title,
//      price,
//      thumbnail,
//      timestamp
//     }
//    }