import {Router} from "express"

const router = Router()

router.get("/api/user", (req, res) => {
    res.json({user: req.session.user})
})

export default router