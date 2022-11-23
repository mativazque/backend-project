import bCrypt from "bcrypt"


function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    )
}

export let users = [{ id: 1, email: 't@gmail', username: 'mati', password: createHash("mati") }]