const {Schema, model} = require("mongoose")


const estudiante = new Schema({
    nombre: {type: 'String', require: true, max: 50},
    apellido: {type: 'String', require: true, max: 50},
    edad: {type: "Number", required: true},
    dni: {type: 'String', unique: true, required: true},
    curso: {type: 'String', required: true},
    nota: {type: "Number", required: true}
})

module.exports = model("estudiantes", estudiante)