const Sequelize = require('sequelize');

const tbl_usuarioModel = require('./models/tbl_usuario');


const sequelize = new Sequelize('S96ufd5lv8', 'S96ufd5lv8', 'V8N4SDDjKg', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});

const tbl_usuario = tbl_usuarioModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas sincronizadas');
    });

module.exports = {
    tbl_usuario
}