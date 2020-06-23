const knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig(environment));

//does it need square brackets or ok as is? knexConfig(environment)