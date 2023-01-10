import { createTransport } from "nodemailer"

export const enviarMail = async (subject, html) => {

    const trasnsporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: "alfonso88@ethereal.email",
            pass: 'JTzfu6mZdRXuB3wkXd'
        }
    })

    const mailOptions = {
        from: 'Servidor Node.js',
        to: "alfonso88@ethereal.email",
        subject: subject,
        html: html
    }

    try {
        const send = await trasnsporter.sendMail(mailOptions)
        console.log(send)
    } catch (error) {
        console.log(error)
    }
    
}

