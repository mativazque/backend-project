import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import bCrypt from "bcrypt"
import {users} from "./../api/users.js"


function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}


const initPassword =  () => {
    passport.use("login", new LocalStrategy( async (username, password, done) => {

        const user = await users.getByUsername(username)

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

            const user = await users.getByUsername(username)

            if (user) {
                console.log('User already exists');
                return done(null, false, { message: 'User already exists' })
            }


            const newUser = await users.save({username: username, password: password})
            const usedCreated = await users.getById(newUser)

            return done(null, usedCreated)
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (_id, done) => { 
        const user = await users.getById(_id)
        done(null, user)
    })
}

export default initPassword

