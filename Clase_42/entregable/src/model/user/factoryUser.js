import 'dotenv/config'

let users


switch (process.env.PERSISTENCIA_USER) {

    case 'MONGODB':
        const { default: daoMongoUser } = await import("./daoMongoUser.js")
        users = daoMongoUser.getInstance()


    // case 'MYSQL':
        

    // case 'FIREBASE':
        
}

export { users }

