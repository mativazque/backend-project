import {request as req} from "express"

const checkAtuhentication = (req, res, next) => {
    if (req.isAuthenticated( )) {
        next()
    } else {
        res.redirect("/login")
    }
}

export default checkAtuhentication
