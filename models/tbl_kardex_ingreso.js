module.exports = (sequelize, type) => {
    return sequelize.define('tbl_kardex_ingreso', {
        kiId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        kiFechaIngreso: type.STRING,
        kiCantidad: type.INTEGER,
        kiValorUnitario: type.DOUBLE(4, 2),
        kiValorTotal: type.DOUBLE(4, 2),
        kiEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });
}