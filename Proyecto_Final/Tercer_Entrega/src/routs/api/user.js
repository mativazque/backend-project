import {Router} from "express"
import {users} from "./../../api/users.js"
import {logger} from "../../api/logger.js"

const router = Router()

router.get("/api/user", async (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    try {
        const user = await users.getByUsername(req.session.passport.user)
        res.json({user: user.name, avatar: user.avatar})
    } catch (error) {
        logger.error(`Error: ${error}`)
    }
})

export default router