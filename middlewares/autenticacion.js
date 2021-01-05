const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, 'seed', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
}

module.exports = {
    verificarToken
}