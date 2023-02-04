import axios from "axios"

const getDate = async () => {
    try {
        const date = await axios.get("http://[::1]:8000/date")
        console.log(date.data)

    } catch (error) {
        console.log(error)
    }
}

async function crearPokemon () {
  const pokemon = {
    name: "Mew",
    type: "Pyscho",
    id: 149
  }
  try {
    const response = await axios.post('http://[::1]:8000/ingreso', pokemon);
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

const test = await crearPokemon();







// import axios from "axios"



// const postRandom = async () => {
//     try {
//         const random = Math.floor(Math.random() * 1000000)
//         const respuest = await axios({
//             method: "post",
//             url: "http://localhost:8080/ingreso",
//             data: {
//                 random: random
//             },
//             headers: {
//                 'Connection': 'keep-alive',
//                 'Accept-Encoding': '',
//                 'Accept-Language': 'en-US,en;q=0.8'
//             }
//         })
//         console.log(respuest.data)

//     } catch (error) {
//         console.log(error)
//     }
// }

// const test = await postRandom()