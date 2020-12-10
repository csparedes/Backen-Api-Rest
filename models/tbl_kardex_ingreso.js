module.exports = (sequelize, type) => {
    return sequelize.define('tbl_karcex_ingreso', {
        ki_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ki_pro_id: type.INTEGER,
        ki_fecha_ingreso: type.DATE,
        ki_cantidad: type.INTEGER,
        ki_valor_unitario: type.DOUBLE,
        ki_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });
}