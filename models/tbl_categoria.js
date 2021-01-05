module.exports = (sequelize, type) => {
    const tbl_categoria = sequelize.define('tbl_categoria', {
        catId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        catNombre: {
            type: type.STRING,
        },
        catDescripcion: {
            type: type.STRING
        },
        catEstado: {
            type: type.BOOLEAN,
            defaultValue: true
        }
    });


    return tbl_categoria;
}