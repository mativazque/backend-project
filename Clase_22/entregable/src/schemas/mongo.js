import mongoose from 'mongoose';

export const mensajeSchema = new mongoose.Schema({
    author: {
        id: { type: "String", required: true },
        nombre: { type: "String", require: true },
        apellido: { type: "String", require: true },
        edad: { type: "Number", require: true },
        alias: { type: "String", require: true },
        avatar: { type: "String", require: true }
    },
    text: { type: "String", require: true },
    fecha: {type: "String", require: true}
})