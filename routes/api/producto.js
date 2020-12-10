const router = require('express').Router();

const { tbl_producto, tbl_categoria } = require('../../db');

const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) => {
    let productos = await tbl_producto.findAll();
    res.json({
        ok: true,
        message: 'Se han cargado los productos',
        productos
    })
});

router.get('/:pro_id', async(req, res) => {
    let prod = await tbl
    _producto.findOne({
        where: {
            pro_id: req.params.pro_id
        }
    });

    res.json({
        ok: true,
        producto: prod
    });
});

router.post('/', [
        //validaciones middleware
        body('pro_id_categoria').custom(cat_id => {
            return tbl_categoria.findOne({
                    where: {
                        cat_id: cat_id
                    }
                })
                .then(categoria => {
                    if (categoria) {
                        return Promise.reject('La categoría no existe');
                    }
                });
        }),
        body('pro_foto').isURL()

    ],
    async(req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errors.array()
            });
        }

        let body = req.body;

        await tbl_producto.create(body)
            .then(producto => {
                res.json({
                    ok: true,
                    message: 'Se ha creado un nuevo Producto',
                    producto
                })
            });
    });

router.put('/:pro_id', [
    //validaciones middleware
    body('pro_id_categoria').custom(cat_id => {
        return tbl_categoria.findOne({
                where: {
                    cat_id: cat_id
                }
            })
            .then(categoria => {
                if (categoria) {
                    return Promise.reject('La categoría no existe');
                }
            });
    }),
    body('pro_foto').isURL()

], async(req, res) => {
    let body = req.body;

    let consulta = await tbl_producto.update(body, {
        where: {
            pro_id: req.params.pro_id
        }
    });

    res.json({
        ok: true,
        message: `Se ha actualizado el producto ${req.params.pro_id}`,
        producto: body
    });
});

router.delete('/:pro_id', async(req, res) => {
    await tbl_producto.destroy({
        where: {
            pro_id: req.params.pro_id
        }
    });
});

module.exports = router;