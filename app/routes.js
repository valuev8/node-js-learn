const express = require('express');
const router = express.Router();
const userController = require('./controller/user.controller')();
const groupController = require('./controller/group.controller')();
const createError = require('http-errors');

router.route('/api/login')
    .get((req, res) => userController.login(req, res));

router.route('/api/users/:id')
    .get((req, res) => userController.getUser(req, res))
    .put((req, res) => userController.updateUser(req, res))
    .delete((req, res) => userController.deleteUser(req, res));

router.route('/api/users')
    .get((req, res) => userController.getUsers(req, res))
    .post((req, res) => userController.createUser(req, res));

router.route('/api/group/:id')
    .get((req, res) => groupController.getGroup(req, res))
    .put((req, res) => groupController.updateGroup(req, res))
    .delete((req, res) => groupController.deleteGroup(req, res));

router.route('/api/groups')
    .get((req, res) => groupController.getGroups(req, res))
    .post((req, res) => groupController.createGroup(req, res));

router.route('/api/userGroup/:id')
    .put((req, res) => groupController.addUserToGroup(req, res));

router.route('*')
    .all((req, res, next) => next(createError(404)));

module.exports = router;
