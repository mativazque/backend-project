import mongoose from 'mongoose';

export const mensajeSchema = new mongoose.Schema({
    username: { type: "String", require: true },
    avatar: { type: "String", require: true },
    tipo: { type: "String", require: true },
    text: { type: "String", require: true },
    fecha: { type: "String", require: true }
})

export const productosSchema = new mongoose.Schema({
    title: { type: "String", require: true, max: 60 },
    price: { type: "Number", require: true },
    thumbnail: { type: "String", require: true },
    timestamp: { type: "String", require: true },
    category: { type: "String", require: true}
})

export const usersSchema = new mongoose.Schema({
    username: { type: "String", require: true },
    password: { type: "String", require: true },
    name: { type: "String", require: true, max: 60 },
    address: { type: "String", require: true },
    age: { type: "Number", require: true },
    phone: { type: "String", require: true },
    avatar: { type: "String", require: true },
    tipo: { type: "String", require: true }
})

export const cartSchema = new mongoose.Schema({
    username: {type: "String", require: true},
    timestamp: { type: "String", require: true },
    productos: { type: "Object", require: true },
})
export const buySchema = new mongoose.Schema({
    username: {type: "String", require: true},
    timestamp: { type: "String", require: true },
    total: { type: "Number", require: true },
    productos: { type: "Object", require: true }
})

