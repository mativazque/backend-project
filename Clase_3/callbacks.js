//Una callback es una funcion que se envia como parametro a otra funcion. La intencion es que la funcion que hace de receptora ejecute esta callback.

// const calculadora = (numA, numB, operacion) => operacion(numA, numB)

// const suma = (a, b) => console.log(a + b)
// const resta = (a, b) => console.log(a - b);
// const division = (a, b) => console.log(a / b);
// const producto = (a, b) => console.log(a * b);

// calculadora(0, 2, suma)

//En el ejemplo la funcion calculadora es receptora de la callback operacion y la ejecuta.

//****************************************************************************************************** */
//****************************************************************************************************** */

//Callbacks se utilizan para ejecutar funciones cuando culmine un proceso, por ejemplo el loggeo como es el caso siguiente.
// En este caso paso por parametro la callback y le asigno el argumento, pero la callback la creo al momento de ejecutar la funcion receptora.

const logear = (text, pushear) => {
    console.log(text)
    pushear(`Loggeado con exito`)
}

logear(`Matías Vázquez`, (notification)=>{
    const date = new Date
    console.log(`${date}: ${notification}`)
})

//****************************************************************************************************** */
//****************************************************************************************************** */
// Es el mismo ejemplo pero en este caso creo la callback de forma separada, no creandola al momento de ejecutar la funcion receptora.

// const logear = (text, pushear) => {
//     console.log(text)
//     pushear()
// }


// const successfully = () => {
//     const date = new Date
//     console.log(`${date}: logeado con exito`)
// }

// logear(`Matias Vazquez 19 años lskdf`, successfully)