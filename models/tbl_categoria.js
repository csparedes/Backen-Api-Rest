module.exports = (sequelize, type) => {
    return sequelize.define('tbl_categoria', {
        cat_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cat_nombre: {
            type: type.STRING,
        },
        cat_descripcion: {
            type: type.STRING
        },
        cat_estado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['cat_nombre']
        }]
    });
}