const router = require('express').Router();

const { tbl_cliente } = require('../../db');

const { body, validationResult } = require('express-validator');

const { verificarToken } = require('../../middlewares/autenticacion');

router.get('/', [
    // verificarToken
], async(req, res) => {

    let clientes = await tbl_cliente.findAll();
    res.json({
        ok: true,
        message: 'Se han obtenido todos los clientes',
        clientes
    });
});

router.get('/:cliId', [
    // verificarToken
], async(req, res) => {
    let cliente = await tbl_cliente.findOne({
        where: {
            cliId: req.params.cliId
        }
    });

    res.json({
        ok: true,
        message: `Se ha obtenido el cliente con id: ${req.params.cliId}`,
        cliente
    });

});

router.post('/', [
    //Validaciones middleware
    // verificarToken,
    // body('cliIdentificacion').isLength({ min: 10 }).custom(value => {
    //     return tbl_cliente.findOne({
    //         where: {
    //             cliIdentificacion: value
    //         }
    //     }).then(user => {
    //         if (user) {
    //             return Promise.reject('Identificación Existente');
    //         }
    //     });
    // }),
    // body('cliFechaNacimiento').isDate()
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    //Peticiones
    let datos = req.body;
    await tbl_cliente.create(datos).then(cliente => {
        res.json({
            ok: true,
            message: 'Se ha creado un nuevo cliente',
            cliente
        });
    });


});

router.put('/:cliId', [
    //Validaciones middleware
    // verificarToken,
    // body('cliIdentificacion').isLength({ min: 10 }).custom(value => {
    //     return tbl_cliente.findOne({
    //         where: {
    //             cliIdentificacion: value
    //         }
    //     }).then(user => {
    //         if (user) {
    //             return Promise.reject('Identificación Existente');
    //         }
    //     });
    // }),
    // body('cliFechaNacimiento').isDate()
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }


    let datos = req.body;

    let cliente = await tbl_cliente.update(datos, {
        where: {
            cliId: req.params.cliId
        }
    });

    res.json({
        ok: true,
        message: `Se ha actualizado el cliente con id: ${req.params.cliId}`,
        cliente
    });
});

router.delete('/:cliId', [
    // verificarToken
], async(req, res) => {
    await tbl_cliente.destroy({
        where: {
            cliId: req.params.cliId
        }
    });

    res.json({
        ok: true,
        message: 'Se ha eliminado el cliente'
    });
});

module.exports = router;