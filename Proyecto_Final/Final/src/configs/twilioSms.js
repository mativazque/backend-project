import twilio from "twilio"
import 'dotenv/config'
import { logger } from "../configs/loggers.js"

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

export const sendSmsToClientNewBuy = async (data) => {

    const html = `Su pedido con Id ${data.id} ha sido recibido y se encuentra en proceso. Pronto nos comunicaremos con usted para culminar la compra`
    const options = {
        body: html,
        from: +15617942730,
        to: +Number(data.phone)
    }
    try {
        const msg = await client.messages.create(options)
        logger.info("SMS enviado exitosamente por nueva compra")

    } catch (error) {
        logger.error(`${error}: error al enviar Whatsapp por nueva compra, corrobore la configuración del servicio`)
    }
}