const { Op } = require('sequelize');
const Ajv = require('ajv');
const createError = require('http-errors');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

const ajv = new Ajv({ allErrors: true });
const userSchema = require('../validation/user-schema');
const validateUser = ajv.compile(userSchema);


module.exports = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async login(login, password) {
        const currentUser = await this.userModel.findAll({
            plain: true,
            where: {
                login,
                password
            }
        });

        if (!currentUser) {
            throw createError(403, 'Incorrect login or password');
        }

        const payload = { id: currentUser.id };
        const token = jwt.sign(payload, 'secret', { expiresIn: 5000 });

        return { token };
    }

    async getUser(id) {
        const user = await this.userModel.findAll({
            plain: true,
            where: {
                id,
                isDeleted: false
            }
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        return user;
    }

    async createUser(user) {
        if (!validateUser(user)) {
            throw await createError(400, `Validation Error: ${ajv.errorsText(validateUser.errors)}`);
        }

        return await this.userModel.create({ ...user, id: uuidv4(), isDeleted: false });
    }

    async updateUser(user, userId) {
        if (!validateUser(user)) {
            throw createError(400, `Validation Error: ${ajv.errorsText(validateUser.errors)}`);
        }

        const updateStatus = await this.userModel.update(user, {
            where: {
                id: userId
            }
        });

        if (updateStatus[0] === 0) {
            throw createError(404, 'User not found');
        }

        return await this.userModel.findAll({
            plain: true,
            where: {
                id: userId
            }
        });
    }

    async deleteUser(userId) {
        const updateStatus = await this.userModel.update({ isDeleted: true }, {
            where: {
                id: userId
            }
        });

        if (updateStatus[0] === 0) {
            throw await createError(404, 'User not found');
        }

        return await this.userModel.findAll({
            where: {
                isDeleted: false
            }
        });
    }

    async getUsers({ loginSubstring = '', limit = 500 }) {
        return await this.userModel.findAll({
            limit,
            where: {
                login: {
                    [Op.substring]: loginSubstring
                },
                isDeleted: false
            }
        });
    }
};
