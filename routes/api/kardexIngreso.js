const router = require('express').Router();

const { tbl_kardex_ingreso, tbl_producto } = require('../../db');

const { verificarToken } = require('../../middlewares/autenticacion');

router.get('/', [
    // verificarToken
], async(req, res) => {
    await tbl_kardex_ingreso.findAll({
            include: {
                model: tbl_producto
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se han cargado todos los ingresos de productos',
                kardex: value
            });
        })
        .catch(error => {
            res.status(500).json({
                ok: false,
                message: 'Ha ocurrido un error',
                error
            })
        })
});

router.post('/', [
    // verificarToken
], async(req, res) => {
    let kardex = req.body;

    await tbl_kardex_ingreso.create(kardex)
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha creado un nuevo ingreso',
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

router.put('/:kiId', [
    // verificarToken
], async(req, res) => {
    let kardex = req.body;

    await tbl_kardex_ingreso.update(kardex, {
            where: {
                kiId: req.params.kiId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha actualizado el registro',
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

router.delete('/:kiId', [
    // verificarToken
], async(req, res) => {
    await tbl_kardex_ingreso.destroy({
            where: {
                kiId: req.params.kiId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha eliminado el registro',
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

module.exports = router;