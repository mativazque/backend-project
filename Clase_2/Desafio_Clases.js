class User {
    constructor(name, surname, books, pets) {
        this.name = name,
        this.surname = surname,
        this.books = books,
        this.pets = pets
    }

    getFullName() {
        console.log(`${this.name} ${this.surname}`)
    }

    addMascotas(name) {
        this.pets.push(name)
    }

    countPets() {
        console.log(this.pets.length)
    }

    addBooks(name, autor) {
        this.books.push({name: name, animal: autor})
    }

    getBookNames() {
        console.log(this.books.map((book) => book.name))
    }

}

const user1 = new User(`Matias`, `Vázquez`, [{name: `Rayuela`, autor: `J. Cortázar`}], [`manchita`])

user1.getFullName();
user1.addMascotas(`Bob`);
user1.countPets();
user1.addBooks(`100 años de soledad`, `G.G.M.`)
user1.getBookNames()

console.log(user1);