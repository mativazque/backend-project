import {Router} from "express"
import { logger } from "../../configs/loggers.js"
import path from "path"
import * as url from "url"


const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const router = Router ()

router.use("/", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.warn(`Not found URL: ${fullUrl}`)
    res.sendFile("undefined.html", {root: path.join(__dirname, "./../../../public")})


})

export default router

