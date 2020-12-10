const router = require('express').Router();

const apiUsuario = require('./api/usuario');
const apiCategoria = require('./api/categoria');
const apiProducto = require('./api/producto');
const apiFacturaDetalle = require('./api/facturaDetalle');
const apiEncabezadoFactura = require('./api/encabezadoFactura');
const apiCliente = require('./api/cliente');
const apiKardexExistencias = require('./api/kardexExistencia');
const apiKardexIngreso = require('./api/kardexIngreso');
const apiKardexSalida = require('./api/kardexSalida');

router.use('/usuario', apiUsuario);
router.use('/categoria', apiCategoria);
router.use('/productos', apiProducto);
router.use('/facturaDetalle', apiFacturaDetalle);
router.use('/encabezadoFactura', apiEncabezadoFactura);
router.use('/clientes', apiCliente);
router.use('/kardexExistencia', apiKardexExistencias);
router.use('/kardexIngreso', apiKardexIngreso);
router.use('/kardexSalida', apiKardexSalida);

module.exports = router;