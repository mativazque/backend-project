import {enviarMail} from "./enviarMail.js"



const envio = await enviarMail(process.argv[2], process.argv[3], process.argv[4], process.argv[5] )
