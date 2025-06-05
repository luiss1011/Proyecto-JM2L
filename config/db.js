//Luis Fernando Sierra Delgado
const sequelize = require('sequelize');

//local host = 127.0.0.1
const db = new sequelize('jm2l', 'root', '',{
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    define: {
        timestamps: false
    }
})

module.exports = db;