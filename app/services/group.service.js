const createError = require('http-errors');
const uuidv4 = require('uuid/v4');

module.exports = class GroupService {
    constructor(groupModel, userGroupModel) {
        this.groupModel = groupModel;
        this.userGroupModel = userGroupModel;
    }

    async getGroup(id) {
        const group = await this.groupModel.findAll({
            plain: true,
            where: {
                id
            }
        });

        return group ? group : createError(404, 'Group not found');
    }

    async createGroup(group) {
        return await this.groupModel.create({ ...group, id: uuidv4() });
    }

    async updateGroup(group, groupId) {
        const updateStatus = await this.groupModel.update(group, {
            where: {
                id: groupId
            }
        });

        if (updateStatus[0] === 0) {
            return await createError(404, 'Group not found');
        }

        return await this.groupModel.findAll({
            plain: true,
            where: {
                id: groupId
            }
        });
    }

    async deleteGroup(groupId) {
        const updateStatus = await this.groupModel.destroy({
            where: {
                id: groupId
            }
        });

        if (updateStatus[0] === 0) {
            return await createError(404, 'Group not found');
        }

        return await this.groupModel.findAll();
    }

    async getGroups() {
        return await this.groupModel.findAll();
    }

    async addUsersToGroup(groupId, { userIds }) {
        const userGroups = [];
        userIds.forEach((id) => userGroups.push({ groupId, userId: id }));
        return await this.userGroupModel.bulkCreate(userGroups);
    }
};
