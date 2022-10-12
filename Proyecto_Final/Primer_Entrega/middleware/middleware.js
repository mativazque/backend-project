const login = (req, res, next) => {

    const administrator = true;

    try {
        if (administrator) {
            next();
        } else {
            res.status(400).json({ error: "400", description: `ruta ${req.originalUrl} y método ${req.method} solo autorizado para administradores` })
        }

    } catch (error) {
        console.log(error)
    }

}

module.exports = login;