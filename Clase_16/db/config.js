const option = {
    mysql: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "desafiocoder"
        }
    },
    sqlite: {
        client: "sqlite3",
        connection: {
            filename: "./dbSqlite/mensajes.sqlite"
        },
        useNullAsDefault: true
    }
}

module.exports = { option }