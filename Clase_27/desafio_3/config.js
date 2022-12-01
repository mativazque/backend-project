import dotenv from 'dotenv/config'
import dotEnv from 'dotenv'
import path from 'path'
import * as url from "url"





const __dirname = url.fileURLToPath(new URL('.', import.meta.url))



dotEnv.config({
    path: process.env.MODO === 'prod' 
    ? path.resolve(__dirname, 'prod.env')
    : path.resolve(__dirname, 'dev.env')
})



const config = {
    puerto: process.env.PUERTO,
    debug: process.env.DEBUG,
}

console.log(process.env.MODO)
export default config