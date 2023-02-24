
function logout(req, res, next) {
    res.clearCookie("jwt")
    next()
};

export { logout }