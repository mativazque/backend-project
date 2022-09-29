const express = require('express');
const app = express();

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on('error', (err) => console.log(err))

app.use(express.static(`${__dirname}/public`))