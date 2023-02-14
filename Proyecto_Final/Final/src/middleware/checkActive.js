import jwt from "jsonwebtoken";


function checkActive(req, res, next) {

    const PRIVATE_KEY = "myprivatekey"

    const token = req.cookies.jwt

    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
        if(decoded) {
            return res.redirect("/")
        } 
        next()
    });
    
};

export { checkActive }
