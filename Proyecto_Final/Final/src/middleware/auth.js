import jwt from "jsonwebtoken"
import {UsersService} from "../service/users.js"
import { sendEmailNewUser } from "../configs/nodemailerGmail.js"

const PRIVATE_KEY = "myprivatekey"

function generateToken(user) {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: "3h" })
    return token
}

async function authSignUp(req, res, next) {
    const { username, name, address, age, phone, avatar } = req.body

    const user = await UsersService.getUser(username)

    if (user) {
        return res.redirect("./signupfial")
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

    await sendEmailNewUser({_id, username, name, address, age, phone})

    res.cookie("jwt", jwt)
    next()
}

async function authLogin(req, res, next) {

    const user = await UsersService.getUser(req.body.username)

    const validationPass = UsersService.isValidPassword(user, req.body.password)

    if (!user || !validationPass) {
        return res.redirect("./loginfail")
    }

    const { _id, username, name, address, age, phone, avatar } = user
    const userToken = { _id, username, name, address, age, phone, avatar }

    const jwt = generateToken(userToken)

    res.cookie("jwt", jwt)
    next()
}

export { authSignUp, authLogin }