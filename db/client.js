const knexConnector = require("knex");

// to connect with development part in knexfile
const knexDevelopmentConfig = require('../knexfile').development;

const client = knexConnector(knexDevelopmentConfig);

module.exports = client;