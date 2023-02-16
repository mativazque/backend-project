import 'dotenv/config'

let mensajes


switch (process.env.PERSISTENCIA_MSJ) {

    case 'MONGODB':
        const { default: daoMongoMensajes } = await import("./../../model/mensajes/daoMongoMsj.js")
        mensajes = daoMongoMensajes.getInstance()


    // case 'MYSQL':
        

    // case 'FIREBASE':
        
}

export { mensajes }

