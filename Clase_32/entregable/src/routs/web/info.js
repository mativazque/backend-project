import { Router } from "express"
import { cpus } from "os"
import { logger } from "../../api/logger.js"

const router = Router()


const data = [
    {
        name: "Path de ejecución",
        value: process.argv[0]
    },
    {
        name: "Sistema operativo",
        value: process.platform
    },
    {
        name: "Process id",
        value: process.pid
    },
    {
        name: "Versión de node.js",
        value: process.version
    },
    {
        name: "Carpeta del proyecto",
        value: process.argv[1]
    },
    {
        name: "Memoria total reservada (rss)",
        value: process.memoryUsage().rss
    },
    {
        name: "Numeros de procesos activos",
        value: cpus().length
    }
]

router.get("/info", (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.info(`Ruth: ${fullUrl} Method: ${req.method}`)
    res.render("info", { data: data, argumentos: process.argv.slice(2) })
})


router.get("/info-bloq", (req, res) => {
    console.log(data)
    res.send(data)
})

router.get("/info-nobloq", (req, res) => {
    res.send(data)
})


export default router

