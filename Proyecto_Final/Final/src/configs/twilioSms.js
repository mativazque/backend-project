// import twilio from "twilio"
// import 'dotenv/config'

// Install twilio

// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)


// export const sendSmsToClientNewBuy = async (data) => {

//     console.log(data)
    
//     const html = `Su pedido con Id ${data.id} ha sido recibido y se encuentra en proceso. Pronto nos comunicaremos con usted para culminar la compra`
//     const options = {
//         body: html,
//         from: +15617942730,
//         to: +Number(data.phone)
//     }
//     try {
//         const msg = await client.messages.create(options)
//         console.log(msg)
//     } catch (error) {
//         console.log(error)
//     }
// }