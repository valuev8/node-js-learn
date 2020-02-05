const Sequelize = require('sequelize');
const sequelize = require('../data-access/data-base');
const User = require('./user.model');
const Group = require('./group.model');

const userGroup = sequelize.define('UserGroups', {
    userId: {
        type: Sequelize.CHAR,
        references: {
            model: User,
            key: 'id'
        }
    },
    groupId: {
        type: Sequelize.CHAR,
        references: {
            model: Group,
            key: 'id'
        }
    }
}, {
    timestamps: false
});
Group.belongsToMany(User, { through: 'UserGroups' });
User.belongsToMany(Group, { through: 'UserGroups' });

module.exports = userGroup;
