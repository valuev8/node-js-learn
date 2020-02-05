const express = require('express');
const app = express();
const userController = require('./controller/user.controller');
const groupController = require('./controller/group.controller');
const sequelize = require('./data-access/data-base');
const port = 3000;

app.use(express.json());
app.use('/', userController);
app.use('/', groupController);

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server has started on port ${port}`);
        });
    })
    .catch((err) => console.log('Unable to connect to the database:', err));
