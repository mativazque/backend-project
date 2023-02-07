import {buildSchema} from "graphql"

const schema = buildSchema(`
  type Producto {
    id: ID!
    title: String,
    price: Int,
    thumbnail: String,
    timestamp: String,
  }
  input ProductoInput {
    title: String,
    price: Int,
    thumbnail: String
  }
  type Query {
    getProducto(id: ID!): Producto,
    getProductos(campo: String, valor: String): [Producto],
  }
  type Mutation {
    createProducto(datos: ProductoInput): Producto
    updateProducto(id: ID!, datos: ProductoInput): Producto,
    deleteProducto(id: ID!): Producto,
  }
`);

export {schema}