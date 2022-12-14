import {Router} from "express"
import {productos} from "./../../api/productos.js"
import {logger} from "../../api/logger.js"

const router = Router()

router.get("/api/productos", async (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    try {
        const products = await productos.getAll()
        res.json({productos: products})
    } catch (error) {
        logger.error(`Error: ${error}`)
    }
})

export default router