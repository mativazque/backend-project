import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import bCrypt from "bcrypt"
import {users} from "../model/daos/factory.js"
import { sendEmailNewUser } from "../configs/nodemailerGmail.js"


function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}


const initPassword = () => {
    passport.use("login", new LocalStrategy(async (username, password, done) => {

        const user = await users.getByUser(username)

        if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false);
        }

        if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false);
        }

        return done(null, user)

    }))

    passport.use("signup", new LocalStrategy(
        { passReqToCallback: true },
        async (req, username, password, done) => {



            const user = await users.getByUser(username)

            if (user) {
                console.log('User already exists');
                return done(null, false, { message: 'User already exists' })
            }

            const { name, address, age, phone, avatar } = req.body

            const encryptedPassword = createHash(password)

            const newUser = await users.save({
                username: username,
                password: encryptedPassword,
                name: name,
                address: address,
                age: age,
                phone: phone,
                avatar: avatar
            })
            const usedCreated = await users.getById(newUser)

            const sendedEmail = sendEmailNewUser({
                username: username,
                name: name,
                address: address,
                age: age,
                phone: phone,
                id: newUser
            })

            return done(null, usedCreated)
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser(async (username, done) => {
        const user = await users.getByUser(username)
        done(null, user)
    })
}

export default initPassword

