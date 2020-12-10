module.exports = (sequelize, type) => {
    return sequelize.define('tbl_kardex_salida', {
        ks_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ks_pro_id: type.INTEGER,
        ks_fecha_salida: type.DATE,
        ks_cantidad: type.INTEGER,
        ks_valor_unitario: type.DOUBLE,
        ks_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });

}