const { paginate } = require('../helpers/paginate');


async function getKeysInfo(request, reply, models) {
    const { query, page = 1, limit = 10 } = request.query;
    const order = [['client_id', 'DESC']];

    try {
        reply.send(await paginate(models.SpotifyKeys, query, page, limit, order));
    } catch (err) {
        console.error('***There was an error', JSON.stringify(err.message))
        return reply.status(400).send(err.message)
    }
}

async function getKeysInfoById(request, reply, models) {
    const { client_id } = request.params;
    await models.SpotifyKeys.findByPk(client_id)
        .then(async (item) => reply.send(item))
        .catch((err) => {
            console.error('***There was an error', JSON.stringify(err.message))
            return reply.status(400).send(err.message)
        });
}

async function storeKeys(request, reply, models) {
    return await models.SpotifyKeys.create(request.body)
        .then((item) => reply.send(item))
        .catch((err) => {
            console.error('***There was an error', JSON.stringify(err.message))
            return reply.status(400).send(err.message)
        });
}

module.exports = {
    getKeysInfo,
    getKeysInfoById,
    storeKeys
}