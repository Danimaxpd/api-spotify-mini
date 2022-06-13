'use strict'

const fp = require('fastify-plugin')
const path = require('path')
const POV = require('@fastify/view')
const { Liquid } = require('liquidjs')

module.exports = fp(async function (fastify, opts) {
    const engine = new Liquid({
        root: path.join(__dirname, "views"),
        extname: ".liquid",
    })
    fastify.register(POV, {
        engine: {
            liquid: engine,
        },
    })
})
