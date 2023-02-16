import jwt from "jsonwebtoken";

function checkAuth(req, res, next) {

    const PRIVATE_KEY = "myprivatekey"

    const token = req.cookies.jwt

    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if (err) {
            res.clearCookie("jwt")
            return res.status(403).redirect("/login")

        }
        req.user = decoded.data;
        next();
    });

};

export { checkAuth }
