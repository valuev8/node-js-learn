const express = require('express');
const router = express.Router();
const logger = require('./logger');

router.route('*')
    .all((req, res, next) => {
        logger.info(`${req.originalUrl}: Method: ${req.method}, body: ${JSON.stringify(req.body)}, query: ${JSON.stringify(req.query)}`);
        next();
    });

module.exports = router;
