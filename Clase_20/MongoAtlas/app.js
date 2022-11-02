const {connectionDB} = require("./config")
const Usuarios = require("./user.model")

//Connection to DB
connectionDB()

const Container = require("./crudMongo")
const user = new Container (Usuarios)

const ver = async () => {
    await user.getAll()

}

// ver()