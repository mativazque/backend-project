const fs = require("fs")

// 1) - Guardar en un archivo la fecha y la hora actual.
// 2) - Leer el archivo creado y que lo muestre por consola.
// 3) - Incluya el manejo de errores con try-catch.

const writeDate = (route) => {
    const date = JSON.stringify(new Date());
    fs.writeFileSync(route, `Date: ${date}`)
}

const readFile = (route) => {
    try {
        console.log(fs.readFileSync(route, "utf-8"))
    } catch (err) {
        console.log(err)
    }

}


writeDate("data.txt");
readFile("data.txt");