const express = require('express');

const args = process.argv.slice(2);
const port = args.length > 0 ? args[0] : 8081;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("hola")
})

app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`)
});



// server.on("request", (req, res) => {
//     const pid = process.pid;
//     const fecha = new Date(Date.now());

//     res.end(`PID: ${pid}}. Fecha: ${fecha}. PORT: ${port}`);
// });

// server.listen(port, () => {
//     console.log(`Servidor escuchando en el puerto ${port}. PID: ${process.pid}`);
// });


