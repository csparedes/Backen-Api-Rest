module.exports = (sequelize, type) => {
    return sequelize.define('tbl_kardex_salida', {
        ksId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ksFechaSalida: type.STRING,
        ksCantidad: type.INTEGER,
        ksValorUnitario: type.DOUBLE(4, 2),
        ksValorTotal: type.DOUBLE(4, 2),
        ksEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });

}