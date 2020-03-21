const express = require('express');
const app = express();
const cors = require('cors');
const createError = require('http-errors');

const sequelize = require('./data-access/data-base');
const routes = require('./routes');
const logMiddleware = require('./log/logging-middleware');
const auth = require('./auth/auth');
const logger = require('./log/logger');
const port = process.env.DB_PORT;

app.use(express.json());
app.use(cors());
app.use(logMiddleware);
app.use(auth);
app.use(routes);

app.use((err, req, res, next) => {
    logger.error(`${req.originalUrl}, Error: ${err}`);
    res.status(err.statusCode || 500);
    res.json(createError(err.status || 500, `${err}`));
});

process.on('UncaughtException', (err) => {
    logger.error(`UncaughtException: ${err}`);
    process.exit(1);
});

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            logger.info(`Server has started on port ${port}`);
        });
    })
    .catch((err) => logger.error(`Unable to connect to the database: ${err}`));
