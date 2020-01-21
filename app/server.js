const express = require('express');
const app = express();
const routes = require('./controller/user.controller');
const sequelize = require('./data-access/data-base');
const port = 3000;

app.use(express.json());
app.use('/', routes);

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server has started on port ${port}`);
        });
    })
    .catch((err) => console.log('Unable to connect to the database:', err));
