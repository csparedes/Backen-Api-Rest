module.exports = (sequelize, type) => {
    return sequelize.define('tbl_factura_detalle', {
        fdId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fdCantidad: type.INTEGER,
        fdValorUnitario: type.DOUBLE(4, 2),
        fdValorTotal: type.DOUBLE(4, 2),
        fdEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    })
}