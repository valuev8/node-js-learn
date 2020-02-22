const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const logger = require('../log/logger');

const UserService = new userService(userModel);

module.exports = () => {
    return {
        login: (req, res) => {
            UserService.login(req.body.login, req.body.password)
                .then((token) => {
                    logger.info(`login, Arguments: ${req.body.login}, ${req.body.password}`);
                    res.json(token);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`login, Arguments: ${req.body.login}, ${req.body.password}, Error: ${err}`);
                });
        },

        getUser: (req, res) => {
            UserService.getUser(req.params.id)
                .then((user) => {
                    logger.info(`getUser, Arguments: ${req.params.id}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`getUser, Arguments: ${req.params.id}, Error: ${err}`);
                });
        },
        updateUser: (req, res) => {
            UserService.updateUser(req.body, req.params.id)
                .then((user) => {
                    logger.info(`updateUser, Arguments: ${req.body}, ${req.params.id}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`updateUser, Arguments: ${req.body}, ${req.params.id}, Error: ${err}`);
                });
        },
        deleteUser: (req, res) => {
            UserService.deleteUser(req.params.id)
                .then((user) => {
                    logger.info(`deleteUser, Arguments: ${req.params.id}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`deleteUser, Arguments: ${req.params.id}, Error: ${err}`);
                });
        },
        getUsers: (req, res) => {
            UserService.getUsers(req.query)
                .then((user) => {
                    logger.info(`getUsers, Arguments: ${req.query}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`getUsers, Arguments: ${req.query}, Error: ${err}`);
                });
        },
        createUser: (req, res) => {
            const user = req.body;

            UserService.createUser(user)
                .then((users) => {
                    logger.info(`createUser, Arguments: ${user}`);
                    res.json(users);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`createUser, Arguments: ${user}, Error: ${err}`);
                });
        }
    };
};
