import { fork } from "child_process";
import { Router } from "express"

const router = Router()


router.get("/counter", (req, res) => {
    const cant = Number(req.query.cant) ? Number(req.query.cant) : 100000000;
    const forked = fork("./src/childProcess/childProcess.js")

    forked.on('message', msg => {
        if (msg == 'listo') {
            forked.send(cant)
        } else {
            res.send(msg)
        }
    })
})

export default router