import { Router } from "express"
import {
    getAllProductos,
    postProducto,
    getProductById,
    getProductsByCat,
    deleteProduct,
    updateProduct
} from "../../controller/productos.js"


const router = Router()

router.get("/api/productos", getAllProductos)
router.get("/api/productos/:id", getProductById)
router.get("/api/productos/categoria/:cat", getProductsByCat)
router.post("/api/productos", postProducto)
router.delete("/api/productos/:id", deleteProduct)
router.put("/api/productos/:id", updateProduct)


export default router