import {Router} from "express"
import checkAtuhentication from "./../../middleware/checkAuthenticaton.js"
import path from "path"
import * as url from "url"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const router = Router()

router.get("/home", checkAtuhentication, (req, res) => {
    res.sendFile("index.html", {root: path.join(__dirname, "./../../../public")})
})

export default router