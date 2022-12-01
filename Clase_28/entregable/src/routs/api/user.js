import {Router} from "express"
import {users} from "./../../api/users.js"

const router = Router()

router.get("/api/user", async (req, res) => {
    const user = await users.getById(req.session.passport.user)
    res.json({user: user.username})
})

export default router