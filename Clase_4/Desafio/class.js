const fs = require('fs')

class Container {
    constructor(routh) {
        this.routh = routh
    }

    async readFile() {
        try {
            return JSON.parse(await fs.promises.readFile(this.routh, "utf-8"))
        } catch (err) {
            console.log(err)
        }
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.routh, JSON.stringify(data), "utf-8")
        } catch (err) {
            console.log(err)
        }

    }

    async save(product) {
        try {
            //Leo el archivo, lo convierto en objeto y lo guardo
            const readData = await this.readFile()
            //Tiene productos?
            if (readData.length > 0) {
                //En caso que si, lo agrego al array de readDate, le asigno id +1 y reestribo el archivo
                const newData = [...readData, { ...product, id: readData[readData.length - 1].id + 1 }]
                await this.writeFile(newData)
                console.log(`Id:`, newData[newData.length - 1].id)
            } else {
                //En caso que no, lo guardo y le asigno id:1
                const newProducts = [{ ...product, id: 1 }]
                await this.writeFile(newProducts)
                console.log(`Id:`, 1)
            }
        } catch (err) {
            console.log("Error", err)
        }
    }

    async getById(id) {
        try {
            const readData = await this.readFile()
            const itemFound = readData.find(item => item.id === id)
            itemFound ? console.log(itemFound): console.log(null);
        } catch (err) {
            console.log(err)
        }
    }

    async getAll() {
        try {
            const readData = await this.readFile()
            console.log(readData)
        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteById(id) {
        try {
            const readData = await this.readFile()
            const newData = readData.filter(item => item.id != id)
            let i = 1
            newData.map(item => item.id = i++)
            await this.writeFile(newData)
            console.log(newData)

        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteAll() {
        try {
            await this.writeFile([])
            const readData = await this.readFile()
            console.log(readData)
        }
        catch (err) {
            console.log(err)
        }
    }
}



module.exports = Container;


