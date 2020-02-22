const groupModel = require('../models/group.model');
const userGroupModel = require('../models/userGroup.model');
const groupService = require('../services/group.service');
const logger = require('../log/logger');


const GroupService = new groupService(groupModel, userGroupModel);


module.exports = () => {
    return {
        getGroup: (req, res) => {
            GroupService.getGroup(req.params.id)
                .then((user) => {
                    logger.info(`getGroup, Arguments: ${req.params.id}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`getGroup, Arguments: ${req.params.id}, Error: ${err}`);
                });
        },
        updateGroup: (req, res) => {
            GroupService.updateGroup(req.body, req.params.id)
                .then((user) => {
                    logger.info(`updateGroup, Arguments: ${req.body}, ${req.params.id}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`updateGroup, Arguments: ${req.body}, ${req.params.id}, Error: ${err}`);
                });
        },
        deleteGroup: (req, res) => {
            GroupService.deleteGroup(req.params.id)
                .then((user) => {
                    logger.info(`deleteGroup, Arguments: ${req.params.id}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`deleteGroup, Arguments: ${req.params.id}, Error: ${err}`);
                });
        },
        getGroups: (req, res) => {
            GroupService.getGroups()
                .then((user) => {
                    logger.info('getGroups');
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`getGroups, Error: ${err}`);
                });
        },
        createGroup: (req, res) => {
            const group = req.body;

            GroupService.createGroup(group)
                .then((user) => {
                    logger.info(`createGroup, Arguments: ${group}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`createGroup, Arguments: ${group}, Error: ${err}`);
                });
        },
        addUserToGroup: (req, res) => {
            GroupService.addUsersToGroup(req.params.id, req.body)
                .then((user) => {
                    logger.info(`addUserToGroup, Arguments: ${req.params.id}, ${req.body}`);
                    res.json(user);
                })
                .catch((err) => {
                    res.status(err.statusCode);
                    res.json(err);
                    logger.info(`addUserToGroup, Arguments: ${req.params.id}, ${req.body}, Error: ${err}`);
                });
        }
    };
};
