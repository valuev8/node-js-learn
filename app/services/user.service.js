const { Op } = require("sequelize");
const Ajv = require('ajv');
const createError = require('http-errors');
const uuidv4 = require('uuid/v4');

const ajv = new Ajv({ allErrors: true });
const userSchema = require('../validation/user-schema');
const validateUser = ajv.compile(userSchema);


module.exports = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getUser(id) {
        const user = await this.userModel.findAll({
            plain: true,
            where: {
                id: id,
                isDeleted: false,
            }
        });

        return user ? user : createError(404, 'User not found');
    }

    async createUser(user) {
        if (!validateUser(user)) {
            return await createError(400, `Validation Error: ${ajv.errorsText(validateUser.errors)}`);
        }

        return await this.userModel.create({...user, id: uuidv4(), isDeleted: false})
    }

    async updateUser(user, userId) {
        if (!validateUser(user)) {
            return await createError(400, `Validation Error: ${ajv.errorsText(validateUser.errors)}`);
        }

        const updateStatus = await this.userModel.update(user, {
            where: {
                id: userId
            }
        });

        if (updateStatus[0] === 0) {
            return await createError(404, `User not found`)
        }

        return await this.userModel.findAll({
            plain: true,
            where: {
                id: userId
            }
        });
    }

    async deleteUser(userId) {
        const updateStatus = await this.userModel.update({isDeleted: true}, {
            where: {
                id: userId
            }
        });

        if (updateStatus[0] === 0) {
            return await createError(404, `User not found`)
        }

        return await this.userModel.findAll({
            where: {
                isDeleted: false
            }
        });
    }

    async getUsers({loginSubstring = '', limit = 500}) {
        // TODO: What approach better - filter data by SQL request or fetch all and then filter on Back end?
        let users = await this.userModel.findAll()
            .filter((user) => !user.isDeleted);

        return this.filterUsers(users, loginSubstring, limit);

        // return await this.userModel.findAll({
        //     limit: limit,
        //     where: {
        //         login: {
        //             [Op.substring]: loginSubstring
        //         },
        //         isDeleted: false
        //     }
        // });
    }

    filterUsers = (users = [], loginSubstring = '', limit) => {
        return users.filter((user) => user.login
            .toLowerCase()
            .includes(loginSubstring.toLowerCase()))
            .slice(0, limit);
    };
};
