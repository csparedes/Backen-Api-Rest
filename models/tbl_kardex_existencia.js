module.exports = (sequelize, type) => {
    return sequelize.define('tbl_kardex_existencia', {
        keId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        keFechaCaducidad: type.STRING,
        keCantidad: type.INTEGER,
        keValorUnitario: type.DOUBLE(4, 2),
        keValorTotal: type.DOUBLE(4, 2),
        keEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });
}