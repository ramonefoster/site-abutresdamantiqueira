class Users {
    constructor(id, nome, email, password){
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.password = password
    }
}

module.exports = Users


// const Sequelize = require('sequelize')

// //sequelize.define('table', {coluns})
// module.exports = sequelize.define('users', {
//     id: {
//         type: Sequelize.INTEGER(8),
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING(50),
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING(50),
//         allowNull: false,
//         unique: true
//     },
//     createdAt: Sequelize.DATE,
//     updatedAt: Sequelize.DATE
// })