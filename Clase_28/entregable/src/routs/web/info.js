import { Router } from "express"

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
    }
]

router.get("/info", (req, res) => {
    res.render("info", { data: data, argumentos: process.argv.slice(2) })
})



export default router

