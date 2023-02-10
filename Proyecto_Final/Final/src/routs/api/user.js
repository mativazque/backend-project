import { Router } from "express"
import { getUserByUsername, getInfoByUsername } from "../../controller/users.js"
import {auth} from "../../middleware/checkAuth.js"

const router = Router()

router.get("/api/user", auth, getUserByUsername)
router.get("/api/user/info", auth, getInfoByUsername)


export default router