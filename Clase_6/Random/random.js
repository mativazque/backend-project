// I wanna get a random element of a array.

const users = [{ name: "matias", age: 26, mail: "matiasvaz@gmail.com" },
{ name: "sebastian", age: 36, mail: "seba@gmail.com" },
{ name: "camila", age: 30, mail: "cami@gmail.com" }]

const rand = Math.floor(Math.random()*users.length)
