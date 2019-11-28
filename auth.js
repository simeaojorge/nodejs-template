var functions = require("./app/function")

module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1]
        const decoded = functions.decodeToken(token)

        req.session.userId = decoded.user.id
        return next();

    } catch (error) {
        res.status(401).send("Não autorizado!")
    }
}