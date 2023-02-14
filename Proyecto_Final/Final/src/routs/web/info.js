import {Router} from "express"
import path from "path"
import * as url from "url"
import { logger } from "../../configs/loggers.js"
import {checkAuth} from "../../middleware/checkAuth.js"



const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const router = Router()

router.get("/info", checkAuth, (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.sendFile("info.html", {root: path.join(__dirname, "./../../../public")})
})

export default router