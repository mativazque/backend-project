import {Router} from "express"
import {auth} from "./../../middleware/auth.js"
import path from "path"
import * as url from "url"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const router = Router()

router.get("/home", auth , (req, res) => {
    res.sendFile("home.html", {root: path.join(__dirname, "./../../../public")})
})

export default router