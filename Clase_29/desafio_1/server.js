import express from "express";
import cluster from "cluster";
import { cpus } from "os";

const numCPUs = cpus().length

console.log(numCPUs)

const app = express();
const PORT = process.argv[2] || 8080
const date = new Date().toLocaleString()


if (cluster.isPrimary) {
    console.log(`Master procces ${process.pid} id running`)
    //Create workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    app.listen(PORT, () => {
        console.log(`Server listening on PORT: ${PORT}, PID: ${process.pid}, date: ${date} `)
    })
    console.log(`Worker ${process.pid} started`)
}




