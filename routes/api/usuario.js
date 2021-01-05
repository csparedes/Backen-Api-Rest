const bcrypt = require('bcrypt');

const { body, validationResult } = require('express-validator');

const router = require('express').Router();

const { tbl_usuario } = require('../../db');

const jwt = require('jsonwebtoken');

const { verificarToken } = require('../../middlewares/autenticacion');

router.get('/', [
    verificarToken
], async(req, res) => {
    const usuarios = await tbl_usuario.findAll();
    res.json(usuarios);
});

router.post('/login', [
    body('usuEmail').isEmail(),
    body('usuPassword').isLength({ min: 6 })
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }

    let datos = req.body;

    await tbl_usuario.findOne({
            where: {
                usuEmail: datos.usuEmail
            }
        }).then(user => {

            //usuario encontrado
            if (!bcrypt.compareSync(datos.usuPassword, user.usuPassword)) {
                return res.status(400).json({
                    ok: false,
                    message: 'Usuario o contraseña incorrectos'
                });
            }
            let token = jwt.sign({
                datos
            }, 'seed', { expiresIn: 1000000 }); //TODO: Cambiar esto en un futuro muy cercano

            res.json({
                ok: true,
                message: 'Acceso Correcto',
                token
            });

        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                message: 'Error Imposible',
                err
            });
        })
});

router.post('/', [
    body('usuNombre').custom(value => {
        return tbl_usuario.findOne({
            where: {
                usuNombre: value
            }
        }).then(user => {
            if (user) {
                return Promise.reject('Nombre de usuario existente');
            }
        });
    }),
    body('usuEmail').isEmail().custom(value => {
        return tbl_usuario.findOne({
            where: {
                usuEmail: value
            }
        }).then(email => {
            if (email) {
                return Promise.reject('El correo ya existe :v');
            }

        });
    }),
    body('usuPassword').isLength({ min: 6 })

], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }


    let datos = req.body;

    let usuario = {
        usuGoogle: datos.usuGoogle,
        usuEstado: datos.usuEstado,
        usuId: datos.usuId,
        usuNombre: datos.usuNombre,
        usuRol: datos.usuRol,
        usuEmail: datos.usuEmail,
        usuPassword: bcrypt.hashSync(datos.usuPassword, 10)
    };

    await tbl_usuario.create(usuario).then(usuario => {
        return res.json({
            ok: true,
            message: 'Se ha creado con éxito un nuevo usuario',
            usuario
        });
    }).catch(err => {
        res.status(400).json({
            ok: false,
            message: 'Ha ocurrido un error imposible',
            err
        });
    });



});

router.put('/:usuId', async(req, res) => {

    let body = req.body;

    let usuario = {
        usuGoogle: datos.usuGoogle,
        usuEstado: datos.usuEstado,
        usuId: datos.usuId,
        usuNombre: datos.usuNombre,
        usuRol: datos.usuRol,
        usuEmail: datos.usuEmail,
        usuPassword: bcrypt.hashSync(datos.usuPassword, 10)
    };

    await tbl_usuario.update(usuario, {
        where: {
            usuId: req.params.usuId
        }
    });

    res.json({
        ok: true,
        message: 'Se ha actualizado el Usuario'
    });
});

router.delete('/:usuId', async(req, res) => {
    await tbl_usuario.destroy({
        where: {
            usuId: req.params.usuId
        }
    });

    res.json({
        ok: true,
        message: 'Se eliminado el usuario'
    });
});

module.exports = router;