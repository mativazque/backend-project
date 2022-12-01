import { Router } from "express"
import path from "path"
import * as url from "url"
import passport from "passport"
import {users} from "./../../api/users.js"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const router = Router()


// Sign up

router.get("/signup", (req, res) => {    
    res.sendFile("signup.html", { root: path.join(__dirname, "./../../../public") })
})

router.get("/signufail", (req, res) => {
    res.sendFile("signupfail.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/signup", passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/signufail',
})
)

//login

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: path.join(__dirname, "./../../../public") })
})

router.get("/loginfail", (req, res) => {
    res.sendFile("loginfail.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/login", passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/loginfail',
})
)

//Logout

router.get("/logout", async (req, res) => {
    const user = await users.getById(req.session.passport.user)
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: `Logout error`, body: err })
        }
    })
    res.render("logout", { nombre: user.username })
})

export default router
