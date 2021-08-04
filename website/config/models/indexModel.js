const Sequelize = require('sequelize')

//sequelize.define('table', {coluns})
module.exports = sequelize.define('materias', {
    id: {
        type: Sequelize.INTEGER(8),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    titulo_materia: {
        type: Sequelize.STRING(250),
        allowNull: false
    },
    subtitulo_materia: {
        type: Sequelize.STRING(250),
        allowNull: false
    },
    conteudo_materia: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    data_materia: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
})