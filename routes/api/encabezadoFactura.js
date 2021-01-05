const router = require('express').Router();


const { tbl_encabezado_factura, tbl_cliente } = require('../../db');

const { verificarToken } = require('../../middlewares/autenticacion');

const { body, validationResult } = require('express-validator');

const sequelize = require('sequelize');

router.get('/', [
    // verificarToken
], async(req, res) => {

    await tbl_encabezado_factura.findAll({
            include: {
                model: tbl_cliente
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha cargado correctamente los encabezados de factura',
                value
            });

        })
        .cacth(err => {
            res.status(400).json({
                ok: false,
                message: "Hay un error en la petición",
                err
            })
        });

});

router.get('/ultimo', [
    // verificarToken
], async(req, res) => {

    await tbl_encabezado_factura.findOne({
            include: {
                model: tbl_cliente
            },
            attributes: [
                [sequelize.fn('max', sequelize.col('efId')), 'maxId']
            ],
            raw: true
        })
        .then(value => {
            res.json({
                ok: true,
                message: "Se ha obtenido el último encabezado",
                value
            });
        })
        .cacth(err => {
            res.status(400).json({
                ok: false,
                message: "Ha ocurrido un error",
                err
            })
        });


});

router.post('/', [
    // verificarToken
    // body('efFecha').isDate()
], async(req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.array()
    //     })
    // }

    let body = req.body;

    await tbl_encabezado_factura.create(body)
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha creado el encabezado',
                ef: value
            });
        })
        .catch(err => {
            res.status(400).json({
                ok: false,
                message: 'Posible error en el servidor',
                err
            });
        });


});

router.put('/:efId', [
    // verificarToken,
    body('efFecha').isDate()
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        })
    }
    let body = req.body;

    await tbl_encabezado_factura.update(body, {
            where: {
                efId: req.params.efId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha actualizado el encabezado de factura',
                ef: value
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: 'Posible error en el servidor',
                err
            });
        });


});

router.delete('/:efId', [
    // verificarToken
], async(req, res) => {
    await tbl_encabezado_factura.destroy({
            where: {
                efId: req.params.efId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha eliminado con éxito el registro',
                value
            })
        })
        .cacth(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error al eliminar el registro',
                err
            });
        });
});

module.exports = router;