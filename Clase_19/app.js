const {connectionDB} = require("./config")
const Estudiantes = require("./user.model")

//Connection to DB
connectionDB()

const Container = require("./crudMongo")
const estudiante = new Container (Estudiantes)

const ver = async () => {
    await estudiante.delete("635df110032d62e0ab3fc3c3", "Mati")

}

ver()