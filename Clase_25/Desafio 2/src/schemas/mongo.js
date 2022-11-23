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

export const productosSchema = new mongoose.Schema({
    title: { type: "String", require: true, max: 60 },
    price: { type: "Number", require: true },
    thumbnail: { type: "String", require: true },
    price: { type: "Number", require: true },
    timestamp: { type: "String", require: true }
})