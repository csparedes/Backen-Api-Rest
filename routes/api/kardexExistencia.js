const router = require('express').Router();


const { tbl_kardex_existencia } = require('../../db');

router.get('/', async(req, res) => {
    let existencias = await tbl_kardex_existencia.findAll();

    res.json({
        ok: true,
        message: 'Se han cargado las existencias de productos',
        existencias
    });
});

router.post('/', async(req, res) => {
    let existencia = req.body;

    let consulta = await tbl_kardex_existencia.create(existencia);

    res.json({
        ok: true,
        message: 'Se ha creado una nueva existencia de producto',
        existencia
    });


});

router.put('/:ke_id', async(req, res) => {
    let existencia = req.body;

    let consulta = await tbl_kardex_existencia.update(existencia, {
        where: {
            ke_id: req.params.ke_id
        }
    });

    res.json({
        ok: true,
        message: `Se ha actualizado la existencia: ${req.params.ke_id}`,
        existencia
    });
});

router.delete('/:ke_id', async(req, res) => {
    await tbl_kardex_existencia.destroy({
        where: {
            ke_id: req.params.ke_id
        }
    });
});

module.exports = router;