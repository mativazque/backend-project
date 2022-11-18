export const login = (req, res, next) => {
    if(req.session.user) {
        next()
    } else {
        res.send("Login failed")
    }
}