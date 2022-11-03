import fs from 'fs'

console.log("Working with FileSystem")

class ControllerArchivo {
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
            return err
        }
    }


    async save(data) {
        try {
            //Leo el archivo, lo convierto en objeto y lo guardo
            const readData = await this.getAll()
            //Tiene productos?
            if (readData.length > 0) {
                //En caso que si, lo agrego al array de readDate, le asigno id +1 y reestribo el archivo
                const newData = [...readData, {
                    ...data, id: readData[readData.length - 1].id + 1,
                    timestamp: new Date().toLocaleString()
                }]
                await this.writeFile(newData)
                return newData[newData.length - 1].id
            } else {
                //En caso que no, lo guardo y le asigno id:1
                const newElement = [{ ...data, id: 1, timestamp: new Date().toLocaleString() }]
                await this.writeFile(newElement)
                return newElement.id
            }
        } catch (err) {
            return err
        }
    }

    async getById(id) {
        try {
            const newId = Number(id)
            const readData = await this.getAll()
            const itemFound = readData.find(item => item.id === newId)
            return itemFound;

        } catch (err) {
            return err
        }
    }


    async deleteById(id) {
        const newId = Number(id)
        try {
            const readData = await this.getAll()
            const newData = readData.filter(item => item.id != newId)
            let i = 1
            newData.map(item => item.id = i++)
            await this.writeFile(newData)
            return true
        }
        catch (err) {
            return err
        }
    }



    async update(element, id) {
        const newId = Number(id)
        try {
            const readData = await this.getAll()
            readData[newId - 1] = { ...element, id: newId }
            await this.writeFile(readData)
            return readData[newId - 1]
        } catch (error) {
            return err
        }
    }

}


export default ControllerArchivo


