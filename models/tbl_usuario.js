module.exports = (sequelize, type) => {
    return sequelize.define('tbl_usuario', {
        usuId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuNombre: {
            type: type.STRING,
            required: [true, 'El nombre es necesario']
        },
        usuRol: {
            type: type.STRING,
            required: [true, 'El Rol es necesario']
        },
        usuEmail: {
            type: type.STRING,
            required: [true, 'El correo es necesario']
        },
        usuGoogle: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        usuPassword: {
            type: type.STRING,
            allowNull: false
        },
        usuEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });
}