module.exports = (sequelize, type) => {
    return sequelize.define('tbl_cliente', {
        cli_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cli_nombres: {
            type: type.STRING
        },
        cli_apellidos: type.STRING,
        cli_identificacion: {
            type: type.STRING(13)
        },
        cli_fecha_nacimiento: type.DATE,
        cli_domicilio: type.STRING,
        cli_correo: type.STRING,
        cli_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }

    });
}