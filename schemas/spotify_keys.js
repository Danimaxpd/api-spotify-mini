module.exports = {
    type: 'object',
    properties: {
        client_id: { type: 'string' },
        client_secret: { type: 'string' },
        access_token: { type: 'string' },
        token_type: { type: 'string' },
        scope: { type: 'string' },
        expires_in: { type: 'integer' },
        refresh_token: { type: 'string' },
        id: { type: 'integer' }
    }
};