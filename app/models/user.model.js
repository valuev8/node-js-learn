const Sequelize = require('sequelize');
const sequelize = require('../data-access/data-base');
module.exports = sequelize.define('user', {
    id: {
        type: Sequelize.CHAR,
        allowNull: false,
        primaryKey: true,
    },
    login: {
        type: Sequelize.CHAR,
        allowNull: false
    },
    password: {
        type: Sequelize.CHAR,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false,
});
