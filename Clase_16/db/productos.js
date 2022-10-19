class Container {
    constructor(knex, table) {
        this.knex = knex
        this.table = table
        this.knex.schema.hasTable(this.table)
            .then((data) => {
                if (data != true) {
                    this.knex.schema.createTable(this.table, table => {
                            table.increments("id"),
                            table.string("title"),
                            table.string("thumbnail"),
                            table.integer("price")
                    })
                        .then(() => console.log("Tabla creada"))
                        .catch((err) => console.log(err))
                }
            })
    }

    async getAll() {
        try {
            const productos = await this.knex.from(this.table).select("*")
            return productos
        } catch (error) {
            console.log(error)
        }
    }

    async save(product) {
        try {
            await this.knex(this.table).insert(product)
            console.log("producto agregado exitosamente")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Container

