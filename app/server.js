const express = require('express');
const app = express();
const routes = require('./api/api');
const port = 3000;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});
