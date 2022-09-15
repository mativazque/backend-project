const express = require('express');
const app = express()
let count = 0;

const PORT = 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Server listening on port ${server.address().port}`)
});

server.on("error", error => console.log("error server", error));

app.get('/', (req, res) => {
    res.send(`<h1> Welcome to express server </h1>`)
})

app.get('/views', (req, res) => {
    res.send(`The views are ${count++}`)
})

app.get('/fyh', (req, res) => {
    res.send(`${new Date}`)
})

