const fs = require('fs')

class Container {
    constructor(routh) {
        this.routh = routh
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.routh, "utf-8"))
        } catch (err) {
            return err
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
            const readData = await this.getAll()
            //Tiene productos?
            if (readData.length > 0) {
                //En caso que si, lo agrego al array de readDate, le asigno id +1 y reestribo el archivo
                const newData = [...readData, { ...product, id: readData[readData.length - 1].id + 1 }]
                await this.writeFile(newData)
                return newData
            } else {
                //En caso que no, lo guardo y le asigno id:1
                const newProducts = [{ ...product, id: 1 }]
                await this.writeFile(newProducts)
                return newProducts
            }
        } catch (err) {
            return err
        }
    }

    async getById(id) {
        try {
            const readData = await this.getAll()
            const itemFound = readData.find(item => item.id === id) ?
                readData.find(item => item.id === id)
                : null;
            return itemFound;

        } catch (err) {
            return err
        }
    }


    async deleteById(id) {
        try {
            const readData = await this.getAll()
            const newData = readData.filter(item => item.id != id)
            let i = 1
            newData.map(item => item.id = i++)
            await this.writeFile(newData)
            return newData

        }
        catch (err) {
            return err
        }
    }

    async deleteAll() {
        try {
            await this.writeFile([])
            const readData = await this.getAll()
            return readData
        }
        catch (err) {
            return err
        }
    }

    async productRandom() {
        try {
            const readData = await this.getAll()

            if (readData.length > 0) {
                const productRandom = readData[Math.floor(Math.random() * readData.length)]
                return productRandom
            } else {
                console.log("No hay productos en la base de datos")
            }
        }
        catch (err) {
            return err
        }
    }
}



module.exports = Container;


