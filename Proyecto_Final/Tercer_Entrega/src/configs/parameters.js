import yargs from "yargs/yargs"

const Yargs = yargs(process.argv.slice(2))
const argus = Yargs.alias({p: "port", m: "mode"}).argv

delete argus.p
delete argus.m

export default argus