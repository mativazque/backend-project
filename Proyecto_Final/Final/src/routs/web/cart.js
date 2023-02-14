import {Router} from "express"
// import checkAtuhentication from "./../../middleware/checkAuthenticaton.js"
import path from "path"
import * as url from "url"
import { logger } from "../../configs/loggers.js"
import {checkAuth} from "../../middleware/checkAuth.js"



const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const router = Router()

router.get("/cart", checkAuth, (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.sendFile("cart.html", {root: path.join(__dirname, "./../../../public")})
})

export default router