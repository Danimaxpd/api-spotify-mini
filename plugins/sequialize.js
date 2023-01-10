'use strict'

const fp = require('fastify-plugin')
require('dotenv').config()
const config = require('../config/config.json')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/hsynlms/sequelize-fastify
 */
module.exports = fp(async function (fastify, opts) {
    console.info('config-->>', fastify, config);
    const typeDialect = process.env.DIALECT_NAME || 'sqlite';
    const options = (typeDialect === 'sqlite') ? {
        sequelizeOptions: {
            dialect: 'sqlite',
            storage: '../db/database.sqlite'
        }
    } : {
        sequelizeOptions: {
            dialect: typeDialect, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
            database: process.env.DATABASE_NAME,
            username: process.env.DATABASE_USER_NAME,
            password: process.env.DATABASE_USER_PASSWORD,
            options: {
                host: process.env.DATABASE_HOST_OR_SERVER,
                port: process.env.DATABASE_PORT,
            }
        }
    };

    fastify.register(require('@easterneas/fastify-sequelize'), { sequelizeOptions: options.sequelizeOptions });
})
