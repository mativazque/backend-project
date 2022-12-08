import {schema, normalize, denormalize} from "normalizr"

const author = new schema.Entity("users")
const mensaje = new schema.Entity("mensajes", {
    author: author
}, {idAttribute: '_id'})

export const mensajesNormalized = new schema.Entity("posts", {
    mensajes: [mensaje]
})

// const normalized = normalize(posts, mensajes)

// const print = (object) => {
//     console.log(util.inspect(object, false, 12, true))
// }

// print(normalized)
// // console.log(normalized)

// // console.log(posts)