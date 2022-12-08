// import { fork } from "child_process";
import { Router } from "express"

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
    const cant = Number(req.query.cant) ? Number(req.query.cant) : 100000000;
    // const forked = fork("./src/childProcess/childProcess.js")

    const counter = contador(cant)

    res.send(counter)
    
})

export default router