const Sequelize = require('sequelize');

const tbl_usuarioModel = require('./models/tbl_usuario');
const tbl_categoriaModel = require('./models/tbl_categoria');
const tbl_productoModel = require('./models/tbl_productos');
const tbl_factura_detalleModel = require('./models/tbl_factura_detalle');
const tbl_encabezado_facturaModel = require('./models/tbl_encabezado_factura');
const tbl_clienteModel = require('./models/tbl_cliente');
const tbl_kardex_existenciaModel = require('./models/tbl_kardex_existencia');
const tbl_kardex_ingresoModel = require('./models/tbl_kardex_ingreso');
const tbl_kardex_salidaModel = require('./models/tbl_kardex_salida');

const sequelize = new Sequelize(
    'S96ufd5lv8',
    'S96ufd5lv8',
    'V8N4SDDjKg', {
        host: 'remotemysql.com',
        dialect: 'mysql'
    }
);

const tbl_categoria = tbl_categoriaModel(sequelize, Sequelize);
const tbl_usuario = tbl_usuarioModel(sequelize, Sequelize);
const tbl_producto = tbl_productoModel(sequelize, Sequelize);
const tbl_factura_detalle = tbl_factura_detalleModel(sequelize, Sequelize);
const tbl_cliente = tbl_clienteModel(sequelize, Sequelize);
const tbl_encabezado_factura = tbl_encabezado_facturaModel(sequelize, Sequelize);
const tbl_kardex_existencia = tbl_kardex_existenciaModel(sequelize, Sequelize);
const tbl_kardex_ingreso = tbl_kardex_ingresoModel(sequelize, Sequelize);
const tbl_kardex_salida = tbl_kardex_salidaModel(sequelize, Sequelize);

//Asociaciones==========================
//Total: 7
//1: Producto-categoria
tbl_producto.belongsTo(tbl_categoria, {
    onDelete: "cascade"
});

tbl_categoria.hasOne(tbl_producto, {

});

//2: KardexExistencia-Producto
tbl_kardex_existencia.belongsTo(tbl_producto, {
    onDelete: "cascade"
});
tbl_producto.hasOne(tbl_kardex_existencia);
//3: KardexIngreso-Producto
tbl_kardex_ingreso.belongsTo(tbl_producto, {
    onDelete: "cascade"
});
tbl_producto.hasOne(tbl_kardex_ingreso);
//4: KardexSalida-Producto
tbl_kardex_salida.belongsTo(tbl_producto, {
    onDelete: "cascade"
});
tbl_producto.hasOne(tbl_kardex_salida);
//5: FacturaDetalle-Producto
tbl_factura_detalle.belongsTo(tbl_producto, {
    onDelete: "cascade"
});
tbl_producto.hasOne(tbl_factura_detalle);
//6: FacturaDetalle-EncabezadoFactura
tbl_factura_detalle.belongsTo(tbl_encabezado_factura, {
    onDelete: "cascade"
});
tbl_encabezado_factura.hasOne(tbl_factura_detalle);
//7: EncabezadoFactura-Cliente
tbl_encabezado_factura.belongsTo(tbl_cliente, {
    onDelete: "cascade"
});
tbl_cliente.hasOne(tbl_encabezado_factura);




sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas sincronizadas');
    });

module.exports = {
    tbl_usuario,
    tbl_categoria,
    tbl_producto,
    tbl_factura_detalle,
    tbl_cliente,
    tbl_kardex_existencia,
    tbl_kardex_ingreso,
    tbl_kardex_salida,
    tbl_encabezado_factura
}