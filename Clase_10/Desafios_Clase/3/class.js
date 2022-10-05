const fs = require('fs')

class Class {
    constructor(path) {
        this.path = path
    }

    async Get() {
        try {
            return JSON.parse(await fs.promises.readFile(this.path, 'utf8'))
        } catch (error) {
            return error
        }
    }

    async Write(data) {
        try {
            return await fs.promises.writeFile(this.path, JSON.stringify(data), 'utf8') 
        } catch (error) {
            return error
        }
    }

    async Save(user){
        try {
            const data = await this.Get()
            const newData = [...data, user]
            await this.Write(newData)
            return await this.Get()
        } catch (error) {
            return error
        }
    }

}

module.exports = Class