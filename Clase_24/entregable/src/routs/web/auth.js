import {Router} from "express"
import path from "path"
import * as url from "url"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))


const router = Router()

router.get("/login", (req, res) => {
    res.sendFile("login.html", {root: path.join(__dirname, "./../../../public")})
})

router.post("/login", (req, res) => {
    req.session.user = req.body.user
    res.redirect("./home")
})

router.get("/logout", (req, res) => {
    const nombre = req.session.user
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: `Logout error`, body: err })
        } 
    })
    res.render("logout", {nombre: nombre} )
})



export default router
