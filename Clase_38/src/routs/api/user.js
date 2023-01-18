import {Router} from "express"
import {getUserByUsername, getInfoByUsername} from "../../controller/users.js"

const router = Router()

router.get("/api/user", getUserByUsername)
router.get("/api/user/info", getInfoByUsername)


export default router