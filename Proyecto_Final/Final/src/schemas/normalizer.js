import { schema } from "normalizr"

const author = new schema.Entity("users")

const mensaje = new schema.Entity("mensajes",
    { author: author },
    { idAttribute: '_id' })

export const mensajesNormalized = new schema.Entity("posts", {
    mensajes: [mensaje]
})

