import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import bCrypt from "bcrypt"
import { users } from "./../users/users.js"


function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    )
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}


const initPassword = () => {
    passport.use("login", new LocalStrategy((username, password, done) => {

        // if (err) return done(err)

        let user = users.find(user => user.username === username)

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
        (req, username, password, done) => {
            let user = users.find(user => user.username === username)

            if (user) {
                console.log('User already exists');
                return done(null, false, { message: 'User already exists' })
            }

            const newUser = {
                id: users.length + 1,
                username,
                password: createHash(password)
            }
            users.push(newUser)
            console.log(users)

            return done(null, newUser)
        }
    ))


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => { // toma el id que esta en las sessiones 
        console.log(users)
        let user = users.find(user => user.id === id)
        done(null, user)
    })



}

export default initPassword

