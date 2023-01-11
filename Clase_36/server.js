import twilio from "twilio"
import 'dotenv/config'


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)



const options = {
    body: 'Hola soy un WSP desde Node.js!',
    mediaUrl: ['https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg'],
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+59898360017'
}

;(async () => {
    try {
        const msg = await client.messages.create(options)
        console.log(msg)
    } catch (error) {
        console.log(error)
    }
})()