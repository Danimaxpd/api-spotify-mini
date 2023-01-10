'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/callback', async function (request, reply) {
    return 'this is an example'
  })
  fastify.get('/keys-info/:client_id', async function (request, reply) {
    const { client_id } = request.params;
    const dataExample = {
      client_id,
      client_secret: 'lmao',
      access_token: 'lmao',
      token_type: 'lmao',
      scope: 'lmao',
      expires_in: 10,
      refresh_token: 'lmao'
    };
    
    await this.models.SpotifyKeys.create(dataExample)
    .then(async (item) => reply.send(await this.models.SpotifyKeys.findAll()))
    .catch((err) => {
      console.error('***There was an error', JSON.stringify(err))
      return reply.status(400).send(err)
    });
  })
  fastify.post('/save-keys', async function (request, reply) {
    return reply.send(request.body);
  })
}
