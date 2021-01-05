const router = require('express').Router();


const { tbl_kardex_existencia, tbl_producto } = require('../../db');
const { Op } = require('sequelize');

const { verificarToken } = require('../../middlewares/autenticacion');

router.get('/', [
    // verificarToken
], async(req, res) => {
    await tbl_kardex_existencia.findAll({
            include: {
                model: tbl_producto,
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se han cargado las existencias de productos',
                existencias: value
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

//Para buscar segun una query
router.get('/:proId', [
    // verificarToken
], async(req, res) => {
    await tbl_kardex_existencia.findAll({
            where: {
                keProId: req.params.proId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se han cargado con éxito las existencias con nombre',
                existencias: value
            });
        })
        .catch(error => {
            res.status(500).json({
                ok: false,
                message: "Ha ocurrido un error imposible",
                error
            });
        });
});

router.post('/', [
    // verificarToken
], async(req, res) => {
    let existencia = req.body;

    await tbl_kardex_existencia.create(existencia)
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha creado una nueva existencia de producto',
                existencia: value
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

router.put('/:keId', [
    // verificarToken
], async(req, res) => {
    let existencia = req.body;

    await tbl_kardex_existencia.update(existencia, {
            where: {
                keId: req.params.keId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: `Se ha actualizado la existencia: ${req.params.keId}`,
                existencia: value
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

router.delete('/:keId', [
    // verificarToken
], async(req, res) => {
    await tbl_kardex_existencia.destroy({
            where: {
                keId: req.params.keId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: `Se ha eliminado la existencia`,
                existencia: value
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