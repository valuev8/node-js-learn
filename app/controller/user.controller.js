const express = require('express');

const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const router = express.Router();

const UserService = new userService(userModel);

router.route('/api/users/:id')
    .get((req, res) => {
        UserService.getUser(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err))
    })
    .put((req, res) => {
        UserService.updateUser(req.body, req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err))
    })
    .delete((req, res) => {
        UserService.deleteUser(req.params.id)
            .then((user) => res.json(user))
            .catch((err) => res.json(err))
    });

router.route('/api/users')
    .get((req, res) => {
        UserService.getUsers(req.query)
            .then((users) => res.json(users))
            .catch((err) => res.json(err));
    })
    .post((req, res) => {
        const user = req.body;

        UserService.createUser(user)
            .then((users) => res.json(users))
            .catch((err) => res.json(err));
    });

module.exports = router;
