import { Router } from "express"
import path from "path"
import * as url from "url"
import passport from "passport"
import {users} from "../../daos/index.js"
import { logger } from "../../loggers/config.js"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const router = Router()


// Sign up

router.get("/signup", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.sendFile("signup.html", { root: path.join(__dirname, "./../../../public") })
})

router.get("/signupfail", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.sendFile("signupfail.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/signup", passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signupfail',
}), (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
}
)

//login

router.get("/login", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.sendFile("login.html", { root: path.join(__dirname, "./../../../public") })
})

router.get("/loginfail", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.sendFile("loginfail.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/login", passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/loginfail',
}), (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
}
)

//Logout

router.get("/logout", async (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    const user = await users.getByUsername(req.session.passport.user)
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: `Logout error`, body: err })
        }
    })
    res.render("logout", { nombre: user.name })
})

export default router