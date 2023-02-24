import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth.js"
import { getByUser } from "../../controller/chat.js";


const router = Router()

router.get("/chat/:username", checkAuth, getByUser)

export default router 