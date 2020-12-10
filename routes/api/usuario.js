const bcrypt = require('bcrypt');

const { check, validationResult } = require('express-validator')

const { body } = require('express-validator');

const router = require('express').Router();

const { tbl_usuario } = require('../../db');

router.get('/', async(req, res) => {
    const usuarios = await tbl_usuario.findAll();
    res.json(usuarios);
});

router.post('/', async(req, res) => {

    let datos = req.body;

    //Validación nombre y password vacío
    if (datos.usu_nombre === undefined || datos.usu_password === undefined) {
        return res.status(400).json({
            ok: false,
            message: 'El nombre y la contraseña son necesarios'
        });

    }

    //Validación de Correo repetido
    tbl_usuario.findOne({
            where: {
                usu_email: datos.usu_email
            }
        })
        .then(user => {
            return res.status(401).json({
                ok: false,
                message: "El correo ya existe"
            });
        })
        .catch(async() => {
            let usuario = {
                usu_google: datos.usu_google,
                usu_estado: datos.usu_estado,
                usu_id: datos.usu_id,
                usu_nombre: datos.usu_nombre,
                usu_rol: datos.usu_rol,
                usu_email: datos.usu_email,
                usu_password: bcrypt.hashSync(datos.usu_password, 10)
            };


            let user = await tbl_usuario.create(usuario);


            res.json(user);
        });


});

router.put('/:usu_id', async(req, res) => {

    let body = req.body;

    let usuario = {
        usu_google: body.usu_google,
        usu_estado: body.usu_estado,
        usu_id: body.usu_id,
        usu_nombre: body.usu_nombre,
        usu_rol: body.usu_rol,
        usu_email: body.usu_email,
        usu_password: bcrypt.hashSync(body.usu_password, 10)
    };

    await tbl_usuario.update(usuario, {
        where: {
            usu_id: req.params.usu_id
        }
    });

    res.json({
        ok: true,
        message: 'Se ha actualizado el Usuario'
    });
});

router.delete('/:usu_id', async(req, res) => {
    await tbl_usuario.destroy({
        where: {
            usu_id: req.params.usu_id
        }
    });

    res.json({
        ok: true,
        message: 'Se eliminado el usuario'
    });
});

module.exports = router;