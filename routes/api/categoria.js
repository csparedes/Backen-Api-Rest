const router = require('express').Router();

const { tbl_categoria } = require('../../db');

const { body, validationResult } = require('express-validator');

const { verificarToken } = require('../../middlewares/autenticacion');


router.get('/', [
    // verificarToken
], async(req, res) => {
    let categorias = await tbl_categoria.findAll();
    res.json({
        ok: true,
        message: 'Se han cargado las categorías',
        categorias
    });
});

router.post('/', [
    //validaciones middleware
    // verificarToken,
    // body('catNombre').custom(valor => {
    //     return tbl_categoria.findOne({
    //             where: {
    //                 catNombre: valor
    //             }
    //         })
    //         .then(categoria => {
    //             if (categoria) {
    //                 return Promise.reject('La categoría ya existe');
    //             }
    //         });

    // })
], async(req, res) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     res.json({
    //         ok: false,
    //         errors: errors.array()
    //     });
    // }


    let datos = req.body;
    await tbl_categoria.create(datos)
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha creado una nueva categoría',
                categoria: value
            });
        })
        .catch(err => {
            res.json({
                ok: false,
                message: 'Ha ocurrido un Error',
                err
            });
        });

});

router.put('/:catId', [
    //verificarToken,
    body('catNombre').custom(valor => {
        return tbl_categoria.findOne({
                where: {
                    catNombre: valor
                }
            })
            .then(categoria => {
                if (categoria) {
                    return Promise.reject('La categoría ya existe');
                }
            });
    })
], async(req, res) => {
    let body = req.body;
    await tbl_categoria.update(body, {
            where: {
                catId: req.params.catId
            }
        })
        .then(value => {
            res.json({
                ok: true,
                message: 'Se ha actualizado la categoria',
                categoria: value
            });

        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: "Ha ocurrido un error imposible",
                err
            })
        });
});

router.delete('/:catId', [
    // verificarToken
], async(req, res) => {
    await tbl_categoria.destroy({
        where: {
            catId: req.params.catId
        }
    })
});

module.exports = router;