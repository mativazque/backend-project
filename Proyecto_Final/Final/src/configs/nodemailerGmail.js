import { createTransport } from "nodemailer";
import "dotenv/config"
import { logger } from "../configs/loggers.js"


const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USER_EMAIL_ADMIN,
        pass: process.env.PASS_EMAIL_ADMIN
    }
})

export const sendEmailNewUser = async (data) => {

    console.log(data)

    const html = `
    <h3>Se ha registrado un nuevo usuario exitosamente</h3>
    <h4>Sos datos son:</h4>
    <ul>
        <li>Id: ${data._id}</li>
        <li>username: ${data.username}</li>
        <li>name: ${data.name}</li>
        <li>address: ${data.address}</li>
        <li>age: ${data.age}</li>
        <li>phone: ${data.phone}</li>
    </ul>`

    const mailOptions = {
        from: 'eCommerce Project',
        to: process.env.USER_EMAIL_ADMIN,
        subject: `Nuevo registro ${data._id}`,
        html: html,
    }
    try {
        const send = await transporter.sendMail(mailOptions)
        logger.info("E-mail enviado exitosamente por nuevo usuario")
    } catch (error) {
        logger.error(error)
    }
}

export const sendEmailtoAdminNewBuy = async (buy) => {

    const html = `
    <h3>Se ha registrado una nueva compra</h3>
    <h4>Sos datos son:</h4>
    <ul>
        <li>Id: ${buy._id}</li>
        <li>Total $: ${buy.total}</li>
        <li>fecha: ${buy.timestamp}</li>
    </ul>
    
    <p>Verificar mediante su ID su estado para cumplir su realización</p>
    `

    const mailOptions = {
        from: 'eCommerce Project',
        to: process.env.USER_EMAIL_ADMIN,
        subject: `Nueva compra ${buy._id}`,
        html: html,
    }
    try {
        const send = await transporter.sendMail(mailOptions)
        logger.info("E-mail enviado exitosamente por nueva compra")
    } catch (error) {
        logger.error(error)
    }
}