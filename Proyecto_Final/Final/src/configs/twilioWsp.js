import twilio from "twilio"
import 'dotenv/config'
import { logger } from "../configs/loggers.js"


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

export const sendWsptoAdminNewBuy = async (data) => {

    const html = `
    Se ha registrado una nueva compra
    
    Sos datos son:
    Id: ${data.id}
    Total $: ${data.total}
    Fecha: ${data.timestamp}
    
    
    Verificar mediante su ID su estado para cumplir su realización
    `
    const options = {
        body: html,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:+${process.env.PHONE_ADMIN}`
    }

    try {
        const msg = await client.messages.create(options)
        logger.info("Whatsapp enviado exitosamente por nueva compra")

    } catch (error) {
        logger.error(`${error}: error al enviar Whatsapp por nueva compra, corrobore la configuración del servicio`)
    }
}