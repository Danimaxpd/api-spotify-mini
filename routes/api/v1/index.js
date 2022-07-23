'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/callback', async function (request, reply) {
    return 'this is an example'
  })
  fastify.get('/keys-info/:client_id', async function (request, reply) {
    const { client_id } = request.params;
    return `this is an example ${client_id}`;
  })
  fastify.post('/save-keys', async function (request, reply) {
    return reply.send(request.body);
  })
}
