const express = require('express');
const createError = require('http-errors');
const uuidv4 = require('uuid/v4');
const Ajv = require('ajv');
const getAutoSuggestUsers = require('../utils/user-filter');
const userSchema = require('../validation/user-schema');

const router = express.Router();
const ajv = new Ajv({ allErrors: true });
const validateUser = ajv.compile(userSchema);

let users = require('../data/users');

router.route('/api/users/:id')
    .all((req, res, next) => {
        const selectedUser = users.find((user) => user.id === req.params.id);
        if (!selectedUser) {
            return next(JSON.stringify(createError(404, 'User not found')));
        }
        next();
    })
    .get((req, res) => {
        res.contentType('application/json');
        const selectedUser = users.find((user) => user.id === req.params.id);
        res.end(JSON.stringify(selectedUser));
    })
    .put((req, res, next) => {
        res.contentType('application/json');

        if (!validateUser(req.body)) {
            return next(JSON.stringify(
                createError(400, `Validation Error: ${ajv.errorsText(validateUser.errors)}`)
            ));
        }

        users = users.map((user) => {
            return user.id === req.params.id ? { ...user, ...req.body } : { ...user };
        });
        res.end(JSON.stringify(users));
    })
    .delete((req, res) => {
        res.contentType('application/json');
        users = users.map((user) => {
            return user.id === req.params.id ? { ...user, isDeleted: true } : { ...user };
        });
        res.end(JSON.stringify(users));
    });

router.route('/api/users')
    .get((req, res) => {
        res.contentType('application/json');

        if (req.query) {
            res.end(JSON.stringify(getAutoSuggestUsers(users, req.query.loginSubstring, req.query.limit)));
        }

        res.end(JSON.stringify(users));
    })
    .post((req, res, next) => {
        res.contentType('application/json');
        if (!validateUser(req.body)) {
            return next(JSON.stringify(
                createError(400, `Validation Error: ${ajv.errorsText(validateUser.errors)}`)
            ));
        }

        const newUser = { ...req.body, id: uuidv4(), isDeleted: false };
        users.push(newUser);
        res.end(JSON.stringify(users));
    });

module.exports = router;
