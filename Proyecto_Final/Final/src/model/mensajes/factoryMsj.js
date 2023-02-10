import 'dotenv/config'

let mensajes


switch (process.env.PERSISTENCIA_MSJ) {

    case 'MONGODB':
        const { default: controllerMsg } = await import("../../container/controllerMsgMongo.js")
        mensajes = controllerMsg.getInstance()


    // case 'MYSQL':
        

    // case 'FIREBASE':
        
}

export { mensajes }

