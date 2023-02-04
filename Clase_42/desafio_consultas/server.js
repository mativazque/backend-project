import express from 'express';



const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/date", (req, res) => {
    const date = new Date().toLocaleString()
    res.json(date)
})

app.post("/ingreso", (req, res) => {
    console.log(req.body)
})

app.listen(8000, ()=>{
    console.log(`Server listening in port 8000`)
}).on('error', err => console.log(err))
