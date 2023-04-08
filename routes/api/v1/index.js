'use strict'

const addHooks = require('./hooks')

module.exports = async function (fastify, opts) {
  // Hooks
  addHooks(fastify)
  // Routes
  fastify.get('/callback', async function (request, reply) {
    return 'this is an example'
  })
  fastify.get('/keys-info', async function (request, reply) {
    const { limit,  offset} = request.params;
    const order = {order: [['client_id', 'DESC']]}
    const filter = offset ? { limit: limit || 10, offset: offset, ...order} : { limit: limit || 10, ...order};
    console.log(filter);
    await this.models.SpotifyKeys.findAll(filter)
      .then(async (item) => reply.send(item))
      .catch((err) => {
        console.log(err);
        console.error('***There was an error', JSON.stringify(err))
        return reply.status(400).send(err)
      });
  })
  fastify.get('/keys-info/:client_id', async function (request, reply) {
    const { client_id } = request.params;
    await this.models.SpotifyKeys.findByPk(client_id)
      .then(async (item) => reply.send(item))
      .catch((err) => {
        console.log(err);
        console.error('***There was an error', JSON.stringify(err))
        return reply.status(400).send(err)
      });
  })
  fastify.post('/save-keys', async function (request, reply) {
    return await this.models.SpotifyKeys.create(request.body)
      .then((item) => reply.send(item))
      .catch((err) => {
        console.log(err);
        console.error('***There was an error', JSON.stringify(err))
        return reply.status(400).send(err)
      });
  })
}