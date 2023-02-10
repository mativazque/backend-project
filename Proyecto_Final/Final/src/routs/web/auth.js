import { Router } from "express"
import path from "path"
import * as url from "url"
import { authSignUp, authLogin } from "../../middleware/auth.js"
import {UsersService} from "../../service/users.js"
import { logger, viewUrl } from "../../configs/loggers.js"
import {auth} from "../../middleware/checkAuth.js"
import {checkActive} from "../../middleware/checkActive.js"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const router = Router()

router.get("/", (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.redirect("/home")
})

// Sign up

router.get("/signup", checkActive, (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.sendFile("signup.html", { root: path.join(__dirname, "./../../../public") })
})

router.get("/signupfail", (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.sendFile("signupfail.html", { root: path.join(__dirname, "./../../../public") })
})

router.post("/signup", authSignUp, (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    res.redirect("/home")
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
    res.redirect("/home")
})

//Logout

router.get("/logout", auth, async (req, res) => {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const user = await UsersService.getUser(req.user.username)
    res.clearCookie("jwt")
    res.render("logout", { nombre: user.name })
})

export default router