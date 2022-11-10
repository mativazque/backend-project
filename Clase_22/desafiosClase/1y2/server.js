import { schema, normalize, denormalize } from "normalizr"
import { empresa } from "./files/empresa.js"
import util from "util"

///Defino esquema de gerente
const gerenteSchema = new schema.Entity("gerentes")

///Defino esquema de encargado
const encargadoSchema = new schema.Entity("encargados")

///Defino esquema de empleados
const empleadosSchema = new schema.Entity("empleados", {
    gerente: gerenteSchema,
    encargado: encargadoSchema
})

//Definimos esquema de empresas
const empresaSchema = new schema.Entity("empresas", {
    gerente: gerenteSchema,
    encargado: encargadoSchema,
    empleados: [empleadosSchema]
})

const normalizedEmpresa = normalize(empresa, empresaSchema)
const denormalizedEmpresa = denormalize(normalizedEmpresa.result, empresaSchema, normalizedEmpresa.entities);

const print = (object) => {
    console.log(util.inspect(object, false, 12, true))
}

print(normalizedEmpresa)
// print(denormalizedEmpresa)

