module.exports = (sequelize, type) => {

    const tbl_producto = sequelize.define('tbl_producto', {
        proId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        proCodigoBarras: {
            type: type.STRING
        },
        proNombre: {
            type: type.STRING
        },
        proFoto: {
            type: type.STRING,
        },
        proEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });

    return tbl_producto;
}