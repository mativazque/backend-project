import { createTransport } from "nodemailer"

export const enviarMail = async (subject, html, email, attachments) => {

    const trasnsporter = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: "xxx@gmail.com",
            pass: 'xxxxxxxxxx'
        }
    })


    let mailOptions;

    if (attachments) {
        mailOptions = {
            from: 'Servidor Node.js',
            to: email,
            subject: subject,
            html: html,
            attachments: [
                {
                    path: "file.jpeg"
                }
            ]
        }
    } else {
        mailOptions = {
            from: 'Servidor Node.js',
            to: email,
            subject: subject,
            html: html,
    }}

    try {
        const send = await trasnsporter.sendMail(mailOptions)
        console.log(send)
    } catch (error) {
        console.log(error)
    }

}

