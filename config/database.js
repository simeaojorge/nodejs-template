require('dotenv').config()
const hooks = require('../app/hooks');

module.exports = {
    username: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database,
    host: process.env.database_host,
    dialect: process.env.database_dialect,
    hooks
  }