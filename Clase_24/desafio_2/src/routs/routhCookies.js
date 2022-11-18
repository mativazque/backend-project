import { Router } from "express"
import { login } from "./../middleware/autentif.js"

const router = Router()

router.get("/user", login, (req, res) => {
    ///Esto lo podría realizar con Middelware, ver ejemplo profe
    req.session.visitas = req.session.visitas ? req.session.visitas + 1 : 1;
    res.send(`<h1>Bienvenid@ ${req.session.user}</h1>
    <h5>Números de visitas: ${req.session.visitas}</h5>`)
})

router.post("/login", (req, res) => {
    const {user, password} = req.body
    if((user != "mati") || (password != "tito")) {
        return res.send("Logín failed")
    }
    req.session.user = req.body.user
    res.send("Login successfully")
})

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: `Logout error`, body: err })
        }
        res.send(`Logout ok!`)
    })
})




export default router




