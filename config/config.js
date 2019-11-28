require('dotenv').config();

const config = {
  "development": {
    "username": process.env.database_user,
    "password": process.env.database_password,
    "database": process.env.database,
    "host": process.env.database_host,
    "dialect": process.env.database_dialect,
    "operatorsAliases": false
  },
  "staging": {
    "username": process.env.database_user,
    "password": process.env.database_password,
    "database": process.env.database,
    "host": process.env.database_host,
    "dialect": process.env.database_dialect,
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.database_user,
    "password": process.env.database_password,
    "database": process.env.database,
    "host": process.env.database_host,
    "dialect": process.env.database_dialect,
    "operatorsAliases": false
  }
}

module.exports = config;
