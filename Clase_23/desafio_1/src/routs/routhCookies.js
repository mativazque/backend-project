import {Router} from "express"

export const routhCookies = Router()

routhCookies.post("/", (req, res) => {
    console.log(req.body)
    res.cookie(req.body.name, req.body.valor, {maxAge: Number(req.body.seconds) * 1000}).send("cookie set")
})

routhCookies.get("/", (req, res) => {
    res.send(req.cookies)
})

routhCookies.delete("/", (req, res) => {
    res.clearCookie(req.body.name).send("cookie clear")
})