import { Router } from "express"
import path from "path"
import * as url from "url"
import { auth } from "./../../middleware/auth.js"
import passport from "passport"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))


const router = Router()

import { users } from "./../../users/users.js"


// Sign up

router.get("/signup", (req, res) => {
    res.sendFile("signup.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/signup", passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
})
)

//login

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: path.join(__dirname, "./../../../public") })
})


router.post("/login", passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
})
)

//Logout

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
