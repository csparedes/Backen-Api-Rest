const router = require('express').Router();

const { tbl_factura_detalle } = require('../../db');

router.get('/', async(req, res) => {
    let detalles = await tbl_factura_detalle.findAll();

    res.json({
        ok: true,
        message: 'Consulta de factura detalle',
        detalles
    })
});

router.post('/', async(req, res) => {
    let body = req.body;

    let consulta = await tbl_factura_detalle.create(body);

    res.json({
        ok: true,
        message: 'Se ha creado un nuevo detalle de factura',
        fd: consulta
    });

});

router.put('/:fd_id', async(req, res) => {
    let body = req.body;

    let consulta = await tbl_factura_detalle.update(body, {
        where: {
            fd_id: req.params.fd_id
        }
    });

    res.json({
        ok: true,
        message: `Se ha actualizado el producto: ${req.params.fd_id}`,
        fd: consulta
    });
});

router.delete('/:fd_id', async(req, res) => {
    await tbl_factura_detalle.destroy({
        where: {
            fd_id: req.params.fd_id
        }
    });
});

module.exports = router;