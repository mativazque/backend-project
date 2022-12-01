import yargs from "yargs/yargs"

const Yargs = yargs(process.argv.slice(2))
const argus = Yargs.alias({p: "puerto"}).argv

delete argus.p

export default argus