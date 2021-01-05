module.exports = (sequelize, type) => {
    return sequelize.define('tbl_encabezado_factura', {
        efId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        efFecha: type.STRING,
        efTotal: {
            type: type.DOUBLE(4, 2),
            defaultValue: 0.00
        },
        efObservacion: {
            type: type.STRING(500),
            defaultValue: "Ninguna"
        },
        efIvaPorcentaje: {
            type: type.DOUBLE(0, 4),
            defaultValue: 0.12
        },
        efIvaValor: {
            type: type.DOUBLE(4, 2),
            defaultValue: 0.00
        },
        efEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });
}