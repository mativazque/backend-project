import {enviarMail} from "./enviarMail.js"



const envio = await enviarMail(process.argv[2], process.argv[3])