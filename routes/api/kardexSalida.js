const router = require('express').Router();

const { tbl_kardex_salida } = require('../../db');

router.get('/', async(req, res) => {
    let kardex = await tbl_kardex_salida.findAll();

    res.json({
        ok: true,
        message: 'Se han cargado las salidas de los productos',
        kardex
    });
});

router.post('/', async(req, res) => {
    let kardex = req.body;

    let consulta = await tbl_kardex_salida.create(kardex);

    res.json({
        ok: true,
        message: 'Se ha creado una nueva salida de producto',
        kardex
    });
});

router.put('/:ks:id', async(req, res) => {
    let kardex = req.body;

    let consulta = await tbl_kardex_salida.update(kardex, {
        where: {
            ks_id: req.params.ks_id
        }
    });

    res.json({
        ok: true,
        message: `Se ha actualizado la salida del producto: ${req.params.ks_id}`,
        kardex
    });
});

router.delete('/:ks_id', async(req, res) => {
    await tbl_kardex_salida.destroy({
        where: {
            ks_id: req.params.ks_id
        }
    });
});


module.exports = router;