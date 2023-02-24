import jwt from "jsonwebtoken"
import { UsersService } from "../service/users.js"
import { sendEmailNewUser } from "../configs/nodemailerGmail.js"
import { logger } from "../configs/loggers.js"
import "dotenv/config"

const PRIVATE_KEY = "myprivatekey"

function generateToken(user) {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: process.env.SESSION_EXPIRATION })
    return token
}

async function authSignUp(req, res, next) {
    const { username, name, address, age, phone, avatar } = req.body

    const user = await UsersService.getUser(username)

    if (user) {
        logger.warn("User already exists")
        return res.redirect("/signupfail")
    }

    const encryptedPassword = UsersService.createHash(req.body.password)

    const _id = await UsersService.save({
        username: username,
        password: encryptedPassword,
        name: name,
        address: address,
        age: age,
        phone: phone,
        avatar: avatar
    })

    const userToken = { _id, username, name, address, age, phone, avatar }

    const jwt = generateToken(userToken)

    await sendEmailNewUser({ _id, username, name, address, age, phone })

    res.cookie("jwt", jwt)
    next()
}

async function authLogin(req, res, next) {

    const user = await UsersService.getUser(req.body.username)

    if (!user) {
        logger.warn("Username doesn't exist")
        return res.redirect("./loginfail")
    } else if (!(UsersService.isValidPassword(user, req.body.password))) {
        logger.warn("Password incorrect")
        return res.redirect("./loginfail")
    }

    const { _id, username, name, address, age, phone, avatar } = user
    const userToken = { _id, username, name, address, age, phone, avatar }

    const jwt = generateToken(userToken)

    res.cookie("jwt", jwt)
    next()
}

export { authSignUp, authLogin }