import log4js from "log4js";

log4js.configure({
    appenders: {
        // defino dos soportes de salida de datos
        consola: { type: 'console' },
        archivo: { type: 'file', filename: 'debug.log' },
        archivoErr: { type: 'file', filename: 'errors.log' },
        // defino sus niveles de logueo
        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        loggerArchivo: { type: 'logLevelFilter', appender: 'archivo', level: 'debug' },
        loggerArchivo2: { type: 'logLevelFilter', appender: 'archivoErr', level: 'error' }
    },
    categories: {
        default: { appenders: ['loggerConsola'], level: 'all' },
        prod: { appenders: ['loggerArchivo', "loggerArchivo2"], level: 'all' }
    }
})

export default log4js