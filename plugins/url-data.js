'use strict'
const fp = require('fastify-plugin')

/**
 * A plugin for Fastify that adds support for getting raw URL information from the request.
 *
 * @see https://github.com/fastify/fastify-url-data
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/url-data'), {
    errorHandler: false
  })
})
