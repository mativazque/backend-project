// import twilio from "twilio"
// import 'dotenv/config'


// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)


// export const sendWsptoAdminNewBuy = async (data) => {
    
//     const html = `
//     Se ha registrado una nueva compra
    
//     Sos datos son:
//     Id: ${data.id}
//     Total $: ${data.total}
//     Fecha: ${data.timestamp}
    
    
//     Verificar mediante su ID su estado para cumplir su realización
//     `
//     const options = {
//         body: html,
//         from: 'whatsapp:+14155238886',
//         to: `whatsapp:+${process.env.PHONE_ADMIN}`
//     }

//     try {
//         const msg = await client.messages.create(options)
//         console.log(msg)
//     } catch (error) {
//         console.log(error)
//     }
// }