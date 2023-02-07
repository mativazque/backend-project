import { initMongoDB } from "./src/utils/initMongoDB.js";
import initPassport from "./src/middleware/passport.js"
import { httpServer } from "./app.js"
import config from "./src/configs/index.js"
import { logger } from "./src/configs/loggers.js"
import { initSocket } from "./src/utils/initSocket.io.js";
import "dotenv/config"

export default (async () => {
    try {
        initMongoDB()
        initPassport()
        initSocket()

        httpServer.listen(config.PORT, () => {
            logger.info(`Server listening on PORT ${config.PORT}`)
        }).on("error", (err) => {
            logger.info(`Server Error: ${err}`)
        })
    } catch (error) {
        console.log(error)
    }
})()


