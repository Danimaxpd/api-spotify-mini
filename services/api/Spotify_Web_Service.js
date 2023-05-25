const axios = require('axios');
const classException = require('../../helpers/throw_functions')

class SpotifyWebService {
    constructor(models, apiUrl, apiAuth) {
        const apiUrlEnv = process.env.SPOTIFY_URL;
        const apiAuthEnv = process.env.SPOTIFY_AUTH;
        this.apiUrl = apiUrl || apiUrlEnv;
        this.apiAuth = apiAuth || apiAuthEnv;
        this.models = models;
    }

    async getScope(client_id) {
        return await this.models.SpotifyKeys.findAll({
            attributes: ['id', 'scope'],
            where: {
                client_id: client_id
            }
        });
    }

    async getSecret(client_id) {
        return await this.models.SpotifyKeys.findAll({
            attributes: ['id', 'client_secret'],
            where: {
                client_id: client_id
            }
        });
    }

    async getAccessToken({ client_id, client_secret, code, state, redirect_uri, grant_type = 'authorization_code' }) {
        if (!state && grant_type === 'authorization_code') {
            throw classException('Error getting the authorization code.', '401');
        }
        
        const bodyData = {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: grant_type
        };

        const options = {
            method: 'POST',
            url: `${this.apiUrl}token`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            data: bodyData
        };

        try {
            const response = await axios.request(options);
            const resData = response.data;

            if (response.status === 200) {
                return {
                    result: true,
                    data: await this.models.SpotifyKeys.update(resData, {
                        where: {
                            client_id: client_id
                        }
                    })
                };
            } else {
                throw classException(res.errors, response.status);
            }
        } catch (error) {
            if (error.code && error.message) {
                throw error;
            }
            throw classException(error, 500);
        }

    }
}

module.exports = SpotifyWebService