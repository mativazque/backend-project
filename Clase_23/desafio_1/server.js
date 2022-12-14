import app from "./app.js"
import "dotenv/config"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
}).on('error', (err) => console.log(err))