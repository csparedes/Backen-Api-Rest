module.exports = (sequelize, type) => {
    return sequelize.define('tbl_factura_detalle', {
        fd_id: {
            type: type.INTEGER,
            primaryKey: true,
            autpIncrement: true
        },
        fd_encabezado_factura: {
            type: type.STRING
        },
        fd_cantidad: type.INTEGER,
        fd_pro_id: type.INTEGER,
        fd_valor_unitario: type.DOUBLE,
        fd_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    })
}