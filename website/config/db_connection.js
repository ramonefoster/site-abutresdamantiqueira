const mysql = require('mysql')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    dialect: 'mysql',
    host: process.env.HOST,
    operatorsAlisases: false,
    dateStrings: 'date',
    define: {
        timestamps: true,
        freezeTableName: true
    }
});

module.exports = sequelize;
global.sequelize = sequelize;