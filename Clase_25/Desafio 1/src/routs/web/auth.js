import { Router } from "express"
import path from "path"
import * as url from "url"
import { auth } from "./../../middleware/auth.js"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))


const router = Router()

let datauser = [{ email: 't@gmail', user: 'mati', password: 'mati' }]


router.get("/signup", (req, res) => {
    res.sendFile("signup.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/signup", (req, res) => {
    if (datauser.find(user => user.user === req.body.user)) {
        res.send({ error: `el usuario ingresado ya existe, elija otro` })
    } else {
        const { email, user, password } = req.body
        datauser.push({ email: email, user: user, password: password })
        res.redirect("/login")
    }
})

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: path.join(__dirname, "./../../../public") })
})


router.post("/login", (req, res) => {
    const userFound = datauser.find(user => user.user === req.body.user)
    if (userFound === undefined) {
        res.send({ error: `usuario no existe` })
    } else if (req.body.password === userFound.password) {
        req.session.user = req.body.user
        res.redirect("./home")
    } else {
        res.send(res.send({error: "contraseña incorrecta"}))
    }
})

router.get("/logout", (req, res) => {
    const user = req.session.user
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: `Logout error`, body: err })
        }
    })
    res.render("logout", { nombre: user })
})

router.get("/datauser", auth, (req, res) => {
    const userFound = datauser.find(user => user.user === req.session.user)
    res.render("dataUser", { user: userFound })
})




export default router
