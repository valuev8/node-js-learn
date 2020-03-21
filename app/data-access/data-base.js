const pg = require('pg');
const Sequelize = require('sequelize');
pg.defaults.ssl = true;

const sequelize = new Sequelize(process.env.DB_URL, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST });

module.exports = sequelize;
