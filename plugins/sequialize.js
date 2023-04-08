'use strict'
require('dotenv').config()

const fp = require('fastify-plugin')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/easterneas/fastify-sequelize
 */
module.exports = fp(async function (fastify, opts) {
    const enviroment = process.env.NODE_ENV || development;
    const typeDialect = process.env.DIALECT_NAME || 'sqlite';
    const config = (typeDialect === 'sqlite') ? {
        "dialect": typeDialect,
        "storage": process.env.DATABASE_STORAGE || '../db/database.sqlite'
    } : {
        "username": process.env.DATABASE_USER_NAME,
        "password": process.env.DATABASE_USER_PASSWORD,
        "database": process.env.DATABASE_NAME,
        "host": process.env.DATABASE_HOST_OR_SERVER,
        "dialect": typeDialect,
        "port": process.env.DATABASE_PORT,
    };
    const configuration = { [enviroment] :  config};
    fastify.register(require('@easterneas/fastify-sequelize'), configuration);
})
