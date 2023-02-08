import { buildSchema } from "graphql"

const schema = buildSchema(`
  type Producto {
    _id: ID
    title: String
    price: Int
    thumbnail: String
    timestamp: String
  }
  input ProductoInput {
    title: String
    price: Int
    thumbnail: String
  }
  type Query {
    getProducto(_id: ID): Producto,
    getProductos(campo: String, valor: String): [Producto],
  }


  type Mutation {
  
    createProducto(
      title: String
      price: Int
      thumbnail: String): Producto,

    updateProducto(_id: ID, 
      title: String
      price: Int
      thumbnail: String): Producto,

    deleteProducto(_id: ID): Producto
  }
`);

export { schema }