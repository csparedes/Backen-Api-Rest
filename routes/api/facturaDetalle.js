const router = require('express').Router();

const { tbl_factura_detalle, tbl_producto } = require('../../db');

const { verificarToken } = require('../../middlewares/autenticacion');

router.get('/', [
    // verificarToken
], async(req, res) => {
    await tbl_factura_detalle.findAll({
            include: {
                model: tbl_producto
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Consulta de factura detalle',
                value
            })
        })
        .cacth(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha sucedido un error',
                err
            });
        });
});

router.get('/:tblEncabezadoFacturaEfId', [
    // verificarToken
], async(req, res) => {
    await tbl_factura_detalle.findAll({
            include: {
                model: tbl_producto
            },
            where: {
                tblEncabezadoFacturaEfId: req.params.tblEncabezadoFacturaEfId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Consulta de factura detalle',
                value
            })
        })
        .cacth(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha sucedido un error',
                err
            });
        });
});

router.post('/', [
    // verificarToken
], async(req, res) => {
    let body = req.body;

    await tbl_factura_detalle.create(body)
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha creado un nuevo detalle de factura',
                fd: value
            });
        })
        .cacth(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha sucedido un error',
                err
            });
        });



});

router.put('/:fdId', [
    // verificarToken
], async(req, res) => {
    let body = req.body;

    await tbl_factura_detalle.update(body, {
            where: {
                fdId: req.params.fdId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: `Se ha actualizado el detalle: ${req.params.fdId}`,
                fd: value
            });
        })
        .cacth(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha sucedido un error',
                err
            });
        });


});

router.delete('/:fdId', [
    // verificarToken
], async(req, res) => {
    await tbl_factura_detalle.destroy({
            where: {
                fdId: req.params.fdId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: `Se ha eliminado el detalle: ${req.params.fdId}`,
                fd: value
            });
        })
        .cacth(err => {
            res.status(500).json({
                ok: false,
                message: 'Ha sucedido un error',
                err
            });
        });
});

module.exports = router;