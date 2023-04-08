'use strict'

const addHooks = require('./hooks')
const adminKeysServices = require('../../../services/api/adminKeys');

module.exports = async function (fastify, opts) {
  // Hooks
  addHooks(fastify)
  // Routes
  fastify.get('/callback', async function (request, reply) {
    return 'this is an example'
  })
  fastify.get('/keys-info', async function (request, reply) {
    const models = this.models;
    return adminKeysServices.getKeysInfo(request, reply, models);
  })
  fastify.get('/keys-info/:client_id', async function (request, reply) {
    const models = this.models;
    return adminKeysServices.getKeysInfoById(request, reply, models);
  })
  fastify.post('/save-keys', async function (request, reply) {
    const models = this.models;
    return adminKeysServices.storeKeys(request, reply, models);
  })
}