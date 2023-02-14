import {Router} from "express"
import {checkAuth} from "../../middleware/checkAuth.js"
import path from "path"
import * as url from "url"
import { logger } from "../../configs/loggers.js"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const router = Router()

router.get("/", checkAuth , (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.redirect("/productos")
})

router.get("/productos", checkAuth, (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.sendFile("home.html", {root: path.join(__dirname, "./../../../public")})
})

export default router
