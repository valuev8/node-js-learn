const pg = require('pg');
const Sequelize = require('sequelize');
pg.defaults.ssl = true;

const sequelize = new Sequelize('postgres://suzrjpooefqaif:a465581542ae6404c039716e8def8f9df7644c3ffe9b30de234437b92a6a9ed1@ec2-54-75-249-16.eu-west-1.compute.amazonaws.com:5432/d1arh0fipraalb');

module.exports = sequelize;
