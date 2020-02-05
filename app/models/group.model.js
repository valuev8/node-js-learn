const Sequelize = require('sequelize');
const sequelize = require('../data-access/data-base');

module.exports = sequelize.define('group', {
    id: {
        type: Sequelize.CHAR,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.CHAR,
        allowNull: false
    },
    permissions: {
        type: Sequelize.ARRAY(Sequelize.CHAR),
        allowNull: false
    }
}, {
    timestamps: false
});
