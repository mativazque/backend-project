import { Router } from "express"
import path from "path"
import * as url from "url"
import { authSignUp, authLogin } from "../../middleware/auth.js"
import {UsersService} from "../../service/users.js"
import { logger, viewUrl } from "../../configs/loggers.js"
import {checkAuth} from "../../middleware/checkAuth.js"
import {checkActive} from "../../middleware/checkActive.js"
import {logout} from "../../middleware/logout.js"


const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const router = Router()


// Sign up

router.get("/signup", (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.sendFile("signup.html", { root: path.join(__dirname, "./../../../public") })
})

router.get("/signupfail", (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.sendFile("signupfail.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/signup", authSignUp, (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.redirect("/productos")
})

//login

router.get("/login", checkActive, (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.sendFile("login.html", { root: path.join(__dirname, "./../../../public") })
})

router.get("/loginfail", (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.sendFile("loginfail.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/login", authLogin, (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.redirect("/")
})

//Logout

router.get("/logout", logout, async (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.redirect("/login")
})

export default router