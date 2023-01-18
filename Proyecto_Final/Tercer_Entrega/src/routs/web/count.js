// import { fork } from "child_process";
import { Router } from "express"
import { logger } from "../../loggers/config.js"

const router = Router()

const object = {}

const contador = (rep) => {
    for (let i = 0; i < rep + 1; i++) {
        const random = Math.floor(Math.random() * (1000 - 1 + 1) + 1)
        if (!object.hasOwnProperty(random)) {
            object[random] = 1;
        } else {
            object[random]++;
        }
    }
    return object
}


router.get("/counter", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)

    const cant = Number(req.query.cant) ? Number(req.query.cant) : 100000000;
    // const forked = fork("./src/childProcess/childProcess.js")

    const counter = contador(cant)

    res.send(counter)
    
})

export default router