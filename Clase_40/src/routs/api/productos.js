import {Router} from "express"
import { getAllProductos } from "../../controller/productos.js"

const router = Router()

router.get("/api/productos", getAllProductos)


export default router