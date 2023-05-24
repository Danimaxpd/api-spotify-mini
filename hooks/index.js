async function myOnSendHandler(req, reply, payload) {
    try {
        let data;
        if (typeof payload === 'string') {
            data = JSON.parse(payload);
        } else if (typeof payload === 'object') {
            data = payload;
        }
        const wrappedPayload = { data };
        return JSON.stringify(wrappedPayload);
    } catch (err) {
        console.error('Error parsing response payload:', err);
        return typeof payload === 'string' ? JSON.stringify({ data: payload }) : payload;
    }
}

function onSendHandler(fastify) {
    fastify.addHook('onSend', myOnSendHandler);
}

module.exports = { onSendHandler };