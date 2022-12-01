import parseArgs from "minimist"

// node main.js 1 2 3 -m dev -p 8080 -d
// { modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }

// const options = {
//     alias: {
//         m: "modo",
//         p: "puerto",
//         d: "debug"
//     }
// }

// const args = parseArgs(process.argv.slice(2), options)

// args.otros = args._
// delete args._
// delete args.m
// delete args.p
// delete args.d


// console.log(args)

/////////////////////////////////////////////////////////////////////////////////
// node main.js 1 2 3
// { modo: 'prod', puerto: 0, debug: false, otros: [ 1, 2, 3 ] }

// const options = {
//     default: {
//         modo: "prod",
//         puerto: 0,
//         debug: false,
//     }
// }

// const args = parseArgs(process.argv.slice(2), options)

// args.otros = args._
// delete args._



// console.log(args)