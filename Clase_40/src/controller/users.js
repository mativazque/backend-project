import { UsersService } from "../service/users.js"
import {logger, viewUrl} from "../loggers/config.js"


async function getUserByUsername (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const user = await UsersService.getUser(req.session.passport.user)
    res.json({user: user})
}

async function getInfoByUsername (req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const dataUser = await UsersService.getUserInfo(req.session.passport.user)
    res.json({data: dataUser})
}

export {getUserByUsername, getInfoByUsername}

