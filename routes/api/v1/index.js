'use strict'

const adminKeysController = require('../../../controllers/adminKeysController');

module.exports = async function (fastify, opts) {
  // Routes
  fastify.get('/callback', async function (request, reply) {
    return 'this is an example'
  })
  fastify.get('/keys-info', async function (request, reply) {
    const models = this.models;
    return adminKeysController.getKeysInfo(request, reply, models);
  })
  fastify.get('/keys-info/:client_id', async function (request, reply) {
    const models = this.models;
    return adminKeysController.getKeysInfoById(request, reply, models);
  })
  fastify.post('/save-keys', async function (request, reply) {
    const models = this.models;
    return adminKeysController.storeKeys(request, reply, models);
  })
}