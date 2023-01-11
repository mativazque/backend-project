import { Router } from "express"
import { logger } from "../../api/logger.js"
import { users } from "../../api/users.js"

const router = Router()


const captureData = (user) => {

    const data = [
        {
            name: "Id User",
            value: user._id
        },
        {
            name: "Username",
            value: user.username
        },
        {
            name: "Name",
            value: user.name
        },
        {
            name: "Address",
            value: user.address
        },
        {
            name: "Age",
            value: user.age
        },
        {
            name: "Phone",
            value: user.phone
        },
        {
            name: "Avatar",
            value: user.avatar
        }]

        return data
}

router.get("/api/info", async (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    const user = await users.getByUsername(req.session.passport.user)
    const data = captureData(user)
    res.json({ data: data })
})


export default router

