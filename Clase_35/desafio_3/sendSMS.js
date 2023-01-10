import twilio from "twilio";

const accountSid = "AC1b2945810fe3013707ae20f920de8473";
const authToken = "2b370f7594feecc5fed9076842a925bb"

const client = twilio(accountSid, authToken)

export const sendSMS = async (phone, text) => {
    try {
        const mensage = await client.messages.create({
            body: text,
            from: +15617942730,
            to: Number(phone)
        })
        console.log(mensage)
    } catch (error) {
        console.log(error)
    }
}

