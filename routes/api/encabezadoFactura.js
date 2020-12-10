const router = require('express').Router();


const { tbl_encabezado_factura } = require('../../db');

router.get('/', async(req, res) => {
    let ef = await tbl_encabezado_factura.findAll();

    res.json({
        ok: true,
        message: 'Se ha cargado correctamente los encabezados de factura',
        ef
    });
});

router.post('/', async(req, res) => {
    let body = req.body;

    let consulta = await tbl_encabezado_factura.create(body);

    response.json({
        ok: true,
        message: 'Se ha creado el encabezado',
        ef: consulta
    })
});

router.put('/:ef_id', async(req, res) => {
    let body = req.body;

    let consulta = await tbl_encabezado_factura.update(body, {
        where: {
            ef_id: req.params.ef_id
        }
    });

    res.json({
        ok: true,
        message: 'Se ha actualizado el encabezado de factura',
        ef: body
    });
});

router.delete('/:ef_id', async(req, res) => {
    await tbl_encabezado_factura.destroy({
        where: {
            ef_id: req.params.ef_id
        }
    });
});

module.exports = router;