'use strict'

const adminKeysController = require('../../../controllers/adminKeysController');
const generateRandomString = require('../../../helpers/strings')

module.exports = async function (fastify, opts) {

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

  // Spotify routes
  fastify.get('/login', function(req, res) {
    const { client_id, scope, redirect_uri } = req.params;
    const state = generateRandomString(16);
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

  fastify.get('/callback', async function (request, reply) {
    // @todo
  })
}