import {holding} from "./holding.js"
import {schema, normalize, denormalize} from "normalizr"
import util from "util"

const gerente = new schema.Entity("gerentes")

const encargado = new schema.Entity("encargados")

const empleado = new schema.Entity("empleados", {
    gerente: gerente,
    encargado: encargado,
})
const empresa = new schema.Entity("empresa", {
    gerente: gerente,
    encargado: encargado,
    empleados: [empleado]
})
const empresas = new schema.Entity("empresas", {
    empresas: [empresa]
})

const normalized = normalize(holding, empresas)
const desnormalized = denormalize(normalized.result, empresas, normalized.entities)


const porcentajeReduccion = ((JSON.stringify(normalized).length/JSON.stringify(desnormalized).length)-1) * 100
// console.log(porcentajeReduccion)


// const print = (object) => {
//     console.log(util.inspect(object, false, 12, true))
// }

// // print(normalized)