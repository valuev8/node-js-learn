const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

router.route('*')
    .all((req, res, next) => {
        if (req.path.includes('login')) return next();

        const token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'secret', (err) => {
                if (err) {
                    res.status(403);
                    res.json(createError(403, 'Access Forbidden'));
                }
                next();
            });
            return;
        }
        res.status(401);
        res.json(createError(401, 'User Unauthorized'));
    });

module.exports = router;
