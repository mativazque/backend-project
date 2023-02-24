import { logger, viewUrl } from "../configs/loggers.js"
import { MensajesService } from "../service/mensajes.js"

async function getByUser(req, res) {
    logger.info(`Ruth: ${viewUrl(req)} Method: ${req.method}`)
    const userMessages = await MensajesService.getByUsername(req.params.username)
    userMessages.length > 0 ?
    res.json(userMessages) :
    res.json(`El user ${req.params.username} no tiene mensajes`)
}

export {getByUser}