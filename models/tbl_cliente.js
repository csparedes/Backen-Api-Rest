module.exports = (sequelize, type) => {
    return sequelize.define('tbl_cliente', {
        cliId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cliNombres: {
            type: type.STRING
        },
        cliApellidos: type.STRING,
        cliIdentificacion: {
            type: type.STRING(13)
        },
        cliFechaNacimiento: type.STRING,
        cliDomicilio: type.STRING,
        cliCorreo: type.STRING,
        cliEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }

    });
}