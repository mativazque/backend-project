import { createTransport } from "nodemailer";
import "dotenv/config"

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USER_EMAIL_ADMIN,
        pass: process.env.PASS_EMAIL_ADMIN
    }
})


export const sendEmailNewUser = async (data) => {

    const html = `
    <h3>Se ha registrado un nuevo exitosamente</h3>
    <h4>Sos datos son:</h4>
    <ul>
        <li>Id: ${data.id}</li>
        <li>username: ${data.username}</li>
        <li>name: ${data.name}</li>
        <li>address: ${data.address}</li>
        <li>age: ${data.age}</li>
        <li>phone: ${data.phone}</li>
    </ul>`

    const mailOptions = {
        from: 'eCommerce Project',
        to: process.env.USER_EMAIL_ADMIN,
        subject: `Nuevo registro ${data.id}`,
        html: html,
    }
    try {
        const send = await transporter.sendMail(mailOptions)
        console.log(send)
    } catch (error) {
        console.log(error)
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
        console.log(send)
    } catch (error) {
        console.log(error)
    }
}