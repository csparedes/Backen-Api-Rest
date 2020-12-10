const router = require('express').Router();

const { tbl_kardex_ingreso } = require('../../db');

router.get('/', async(req, res) => {
    let kardex = await tbl_kardex_ingreso.findAll();

    res.json({
        ok: true,
        message: 'Se han cargado todos los ingresos de productos',
        kardex
    });
});

router.post('/', async(req, res) => {
    let kardex = req.body;

    let consulta = await tbl_kardex_ingreso.create(kardex);

    res.json({
        ok: true,
        message: 'Se ha creado un nuevo ingreso',
        kardex
    });
});

router.put('/:ki:id', async(req, res) => {
    let kardex = req.body;

    let consulta = await tbl_kardex_ingreso.update(kardex, {
        where: {
            ki_id: req.params.ki_id
        }
    });
});

router.delete('/:ki_id', async(req, res) => {
    await tbl_kardex_ingreso.destroy({
        where: {
            ki_id: req.params.ki_id
        }
    });
});

module.exports = router;