const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        divisor === 0 ? reject(`No puedes dividir entre cero`) : resolve(dividendo / divisor);
    })
}

dividir(55, 1)
    .then(res => res = res + 8)
    .then(res => res = res + 90)
    .then((res)=> {
        if (res == 100)  throw "Error" 
        else return console.log(res); 
    })

    .catch((reject) => console.log(reject))

