import {Router} from "express"
import {productosFaker} from "../../api/productosFaker.js"
import checkAtuhentication from "./../../middleware/checkAuthenticaton.js"
import { logger } from "../../api/logger.js"

const router = Router()

router.get("/", checkAtuhentication , (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    const products = productosFaker.randomProducts()
    res.render("productosTest", {productos: products, render: true})
})


export default router

