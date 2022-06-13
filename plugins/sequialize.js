'use strict'

const fp = require('fastify-plugin')
require('dotenv').config()

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/hsynlms/sequelize-fastify
 */
module.exports = fp(async function (fastify, opts) {
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

    fastify.register(require('sequelize-fastify'), { instance: 'db', sequelizeOptions: options.sequelizeOptions }).ready(async () => {
        try {
            // first connection
            await fastify.db.authenticate()

            console.log(
                'Database connection is successfully established.'
            )
        } catch (err) {
            console.log(
                `Connection could not established: ${err}`
            )
        }
    })
})
