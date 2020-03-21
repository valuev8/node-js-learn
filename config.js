require('dotenv').config();
module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3000,
        database: process.env.DB_DATABASE || '',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        ssl: true,
        dialectOptions:{
            ssl:{
                require: true
            }
        }
    }
};
