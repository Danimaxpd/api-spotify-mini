'use strict'

async function myOnSendHandler(request, reply, payload) {
    try {
        const data = JSON.parse(payload);
        const wrappedPayload = { data };
        return JSON.stringify(wrappedPayload);
    } catch (err) {
        // Handle JSON parse error
        console.error('Error parsing response payload:', err);
        return payload;
    }
}

module.exports = function addHooks(fastify) {
    fastify.addHook('onSend', myOnSendHandler)
}