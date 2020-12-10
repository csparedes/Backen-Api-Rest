const router = require('express').Router();

const { tbl_categoria } = require('../../db');

const { body, validationResult } = require('express-validator');

router.get('/', async(req, res) => {
    let categorias = await tbl_categoria.findAll();
    res.json({
        ok: true,
        message: 'Se han cargado las categorías',
        categorias
    });
});

router.post('/', [
    //validaciones middleware
    body('cat_nombre').custom(valor => {
        return tbl_categoria.findOne({
                where: {
                    cat_nombre: valor
                }
            })
            .then(categoria => {
                if (categoria) {
                    return Promise.reject('La categoría ya existe');
                }
            });
    })
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({
            ok: false,
            errors: errors.array()
        });
    }


    let datos = req.body;
    await tbl_categoria.create(datos)
    then(value => {
            res.json({
                ok: true,
                message: 'Se ha creado una nueva categoría',
                categoria: value
            });
        })
        .catch(err => {
            res.json({
                ok: false,
                message: 'Ha ocurrido un Error'
            });
        });

});

router.put('/:cat_id', async(req, res) => {
    let body = req.body;
    await tbl_categoria.update(body, {
        where: {
            cat_id: req.params.cat_id
        }
    });

    res.json({
        ok: true,
        message: 'Se ha actualizado la categoria'
    });
});

router.delete('/:cat_id', async(req, res) => {
    await tbl_categoria.destroy({
        where: {
            cat_id: req.params.cat_id
        }
    })
});

module.exports = router;