module.exports = (sequelize, type) => {
    return sequelize.define('tbl_usuario', {
        usu_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usu_nombre: {
            type: type.STRING,
            required: [true, 'El nombre es necesario']
        },
        usu_rol: {
            type: type.STRING,
            required: [true, 'El Rol es necesario']
        },
        usu_email: {
            type: type.STRING,
            required: [true, 'El correo es necesario']
        },
        usu_google: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        usu_password: {
            type: type.STRING,
            allowNull: false
        },
        usu_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['usu_email', 'usu_id']
        }]
    });
}