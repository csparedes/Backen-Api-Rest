const router = require('express').Router();

const { tbl_producto, tbl_categoria, tbl_kardex_existencia } = require('../../db');

const { body, validationResult } = require('express-validator');

const { verificarToken } = require('../../middlewares/autenticacion');

const { Op } = require('sequelize');

router.get('/', [
    // verificarToken
], async(req, res) => {
    await tbl_producto.findAll({
            include: {
                model: tbl_categoria,

            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se han cargado los productos',
                productos: value
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

router.get('/:proId', [
    // verificarToken
], async(req, res) => {
    await tbl_producto.findOne({
            include: {
                model: tbl_categoria,

            },
            where: {
                proId: req.params.proId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha cargado el producto correctamente',
                producto: value
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
//buscar segun query
router.get('/find/:query', [verificarToken], async(req, res) => {
    await tbl_producto.findAll({
            where: {
                proNombre: {
                    [Op.like]: `%${req.params.query}%`
                }
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha cargado el producto correctamente',
                productos: value
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

router.post('/', [
        //validaciones middleware
        // verificarToken,
        // body('proIdCategoria').custom(catId => {
        //     return tbl_categoria.findOne({
        //             where: {
        //                 catId: catId
        //             }
        //         })
        //         .then(categoria => {
        //             if (categoria) {
        //                 return Promise.reject('La categoría no existe');
        //             }
        //         });
        // }),
        // body('proFoto').isURL()

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

router.put('/:proId', [
    //validaciones middleware
    verificarToken,
    // body('proIdCategoria').custom(catId => {
    //     return tbl_categoria.findOne({
    //             where: {
    //                 catId: catId
    //             }
    //         })
    //         .then(categoria => {
    //             if (categoria) {
    //                 return Promise.reject('La categoría no existe');
    //             }
    //         });
    // }),
    // body('proFoto').isURL()

], async(req, res) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.array()
    //     })
    // }


    let body = req.body;

    await tbl_producto.update(body, {
            where: {
                proId: req.params.proId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: `Se ha actualizado el producto ${req.params.proId}`,
                producto: value
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

router.delete('/:proId', [verificarToken], async(req, res) => {
    await tbl_producto.destroy({
            where: {
                proId: req.params.proId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha eliminado el producto',
                producto: value
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

module.exports = router;