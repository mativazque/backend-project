import yargs from "yargs/yargs"

const Yargs = yargs(process.argv.slice(2))


// node main.js 1 2 3 -m dev -p 8080 -d
// { modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }

// const argus = Yargs.alias({m: "modo", p: "puerto", d: "debug"}).argv

// argus.otros = argus._
// delete argus._ 
// delete argus.m
// delete argus.p
// delete argus.d


// console.log(argus)

///////////////////////////////////////////////////////////////////////////////////////////
// node main.js 1 2 3
// { modo: 'prod', puerto: 0, debug: false, otros: [ 1, 2, 3 ] }


const argus = Yargs.default({modo: "prod", puerto: "0", debug: false}).argv

argus.otros = argus._
delete argus._

console.log(argus)