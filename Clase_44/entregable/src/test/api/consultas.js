import axios from "axios";
import initServer from "../../../server.js"; // To init Server


const url = "http://127.0.0.1:8080/api/productos"

const newProduct = {
    title: "Regla Z",
    price: 30,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}

async function getAll() {
    try {
        const productos = await axios.get(url)
        return productos.data
    } catch (error) {
        console.log(error)
    }
}

async function getById(id) {
    try {
        const product = await axios.get(`${url}/${id}`)
        return product.data
    } catch (error) {
        console.log(error)
    }
}

async function addProduct(product) {
    try {
        const response = await axios.post(url, product);
        return response.data
    } catch (err) {
        console.log(err)
    }
}

async function deleteById(id) {
    try {
        const product = await axios.delete(`${url}/${id}`)
        return product.data
    } catch (error) {
        console.log(error)
    }
}

async function update(id, newProduct) {
    try {
        const product = await axios.put(`${url}/${id}`, newProduct)
        return product.data
    } catch (error) {
        console.log(error)
    }
}

//Considerar el método "getAll" para visualizar id de productos


// const testGetAll = console.log(await getAll())
// const testGetById = console.log(await getById("63b495ac4207eabd4a000fcc"))
const testPost = console.log(await addProduct(newProduct))
// const testDelete = console.log(await deleteById("63ddbb391841e806c697ef57"))
// const testGetAll = console.log(await update("63ddbb391841e806c697ef57", newProduct))