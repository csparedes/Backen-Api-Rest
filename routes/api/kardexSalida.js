const router = require('express').Router();

const { tbl_kardex_salida, tbl_producto } = require('../../db');

const { verificarToken } = require('../../middlewares/autenticacion');

router.get('/', [
    // verificarToken
], async(req, res) => {
    await tbl_kardex_salida.findAll({
            include: {
                model: tbl_producto
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se han cargado las salidas de los productos',
                kardex: value
            });
        })
        .catch(error => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error
            });
        });
});

router.post('/', [
    // verificarToken
], async(req, res) => {
    let kardex = req.body;

    await tbl_kardex_salida.create(kardex)
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha creado una nueva salida de producto',
                kardex: value
            });
        })
        .catch(error => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error
            });
        });


});

router.put('/:ksId', [
    // verificarToken
], async(req, res) => {
    let kardex = req.body;

    await tbl_kardex_salida.update(kardex, {
            where: {
                ksId: req.params.ksId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha creado una actualizado la salida de producto',
                kardex: value
            });
        })
        .catch(error => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error
            });
        });

});

router.delete('/:ksId', [
    // verificarToken
], async(req, res) => {
    await tbl_kardex_salida.destroy({
            where: {
                ksId: req.params.ksId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha eliminado la salida de producto'

            });
        })
        .catch(error => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error
            });
        });
});


module.exports = router;