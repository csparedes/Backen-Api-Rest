module.exports = (sequelize, type) => {
    return sequelize.define('tbl_kardex_existencia', {
        ke_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ke_pro_id: type.INTEGER,
        ke_fecha_caducidad: type.DATE,
        ke_cantidad: type.INTEGER,
        ke_valor_promedio: type.DOUBLE,
        ke_valor_total: type.DOUBLE,
        ke_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }


    });
}