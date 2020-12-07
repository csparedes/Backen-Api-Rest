module.exports = (sequelize, type) => {
    return sequelize.define('tbl_usuario', {
        usu_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usu_nombre: type.STRING,
        usu_rol: type.STRING,
        usu_email: type.STRING,
        usu_google: type.BOOLEAN,
        usu_password: type.STRING,
        usu_estado: type.BOOLEAN
    });
}