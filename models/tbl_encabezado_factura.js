module.exports = (sequelize, type) => {
    return sequelize.define('tbl_encabezado_factura', {
        ef_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ef_numero: type.STRING,
        ef_cli_id: type.INTEGER,
        ef_fecha: type.DATE,
        ef_total: {
            type: type.DOUBLE(4, 2),
            defaultValue: 0.00
        },
        ef_observacion: type.STRING(500),
        ef_iva_porcentaje: {
            type: type.DOUBLE(0, 4),
            defaultValue: 0.12
        },
        ef_iva_valor: {
            type: type.DOUBLE(4, 2),
            defaultValue: 0.00
        },
        ef_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });
}