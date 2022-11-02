const {Schema, model} = require("mongoose")


const user = new Schema({
    nombre: {type: 'String', require: true, max: 50},
    apellido: {type: 'String', require: true, max: 50},
    dni: {type: 'String', unique: true, required: true}
})

module.exports = model("usuarios", user)