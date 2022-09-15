const http = require('http');

const grettings = () => {
    const date = new Date
    const hour = date.getHours()
    
    if (6 <= hour && hour <= 12) return ("Buenos dias!")
    else if (13 <= hour && hour <= 19) return ("Buenas tardes!")
    else return ("Buenas noches")   
}

const server = http.createServer((req, res) => {
    res.end(grettings())
})

const port = 8080;

const connectedServer = server.listen(port, () => {
    console.log(`Server http ejecutandose en puerto ${connectedServer.address().port}`)
})

