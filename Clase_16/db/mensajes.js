class Container {
    constructor(knex, table) {
        this.knex = knex
        this.table = table
        this.knex.schema.hasTable(this.table)
            .then((data) => {
                if (data != true) {
                    this.knex.schema.createTable(this.table, table => {
                            table.string("mail"),
                            table.string("fecha"),
                            table.string("text")
                    })
                        .then(() => console.log("Tabla creada"))
                        .catch((err) => console.log(err))
                }
            })
    }

    async getAll() {
        try {
            const mensajes = await this.knex.from(this.table).select("*")
            return mensajes
        } catch (error) {
            console.log(error)
        }
    }

    async save(msj) {
        try {
            await this.knex(this.table).insert(msj)
            console.log("producto agregado exitosamente")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Container

