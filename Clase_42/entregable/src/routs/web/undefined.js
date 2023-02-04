import {Router} from "express"
import {logger} from "../../loggers/config.js"

const router = Router ()

router.use("/", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.warn(`Not found URL: ${fullUrl}`)
    res.status(404).send(`Error 404, not found URL: ${fullUrl}`)

})

export default router