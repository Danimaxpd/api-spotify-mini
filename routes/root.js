'use strict'

module.exports = async function (fastify, opts) {
  fastify.get("/", (request, reply) => {
    const urlData = request.urlData()
    const host = urlData.host
    reply.view("./views/home.liquid", { host });
  });
}
