const router = require('express').Router();

const { tbl_cliente } = require('../../db');

const { body, validationResult } = require('express-validator');


router.get('/', async(req, res) => {

    let clientes = await tbl_cliente.findAll();
    res.json({
        ok: true,
        message: 'Se han obtenido todos los clientes',
        clientes
    });
});

router.get('/:cli_id', async(req, res) => {
    let cliente = await tbl_cliente.findOne({
        where: {
            cli_id: req.params.cli_id
        }
    });

    res.json({
        ok: true,
        message: `Se ha obtenido el cliente con id: ${req.params.cli_id}`,
        cliente
    });

});

router.post('/', [
    //Validaciones middleware
    body('cli_identificacion').isLength({ min: 10 }).custom(value => {
        return tbl_cliente.findOne({
            where: {
                cli_identificacion: value
            }
        }).then(user => {
            if (user) {
                return Promise.reject('Identificación Existente');
            }
        });
    }),
    body('cli_fecha_nacimiento').isDate()
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array()
        });
    }
    //Peticiones
    let datos = req.body;
    await tbl_cliente.create(datos).then(cliente => {
        res.json({
            ok: true,
            message: 'Se ha creado un nuevo cliente',
            cliente
        });
    });


});

router.put('/:cli_id', [
    //Validaciones middleware
    body('cli_identificacion').isLength({ min: 10 }).custom(value => {
        return tbl_cliente.findOne({
            where: {
                cli_identificacion: value
            }
        }).then(user => {
            if (user) {
                return Promise.reject('Identificación Existente');
            }
        });
    }),
    body('cli_fecha_nacimiento').isDate()
], async(req, res) => {
    let datos = req.body;

    let cliente = await tbl_cliente.update(datos, {
        where: {
            cli_id: req.params.cli_id
        }
    });

    res.json({
        ok: true,
        message: `Se ha actualizado el cliente con id: ${req.params.cli_id}`,
        cliente
    });
});

router.delete('/:cli:id', async(req, res) => {
    await tbl_cliente.destroy({
        where: {
            cli_id: req.params.cli_id
        }
    });

    res.json({
        ok: true,
        message: 'Se ha eliminado el cliente'
    });
});

module.exports = router;