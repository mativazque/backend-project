import { Router } from "express"
import { getUserByUsername, getInfoByUsername } from "../../controller/users.js"
import {checkAuth} from "../../middleware/checkAuth.js"

const router = Router()

router.get("/api/user", checkAuth, getUserByUsername)
router.get("/api/user/info", checkAuth, getInfoByUsername)


export default router