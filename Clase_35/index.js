import { createTransport } from "nodemailer";

const TEST_MAIL = "alfonso88@ethereal.email"

const trasnsporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'JTzfu6mZdRXuB3wkXd'
    }
})

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
}

try {
    const info = await trasnsporter.sendMail(mailOptions)
    console.log(info)
} catch (err) {
    console.log(err)
}

