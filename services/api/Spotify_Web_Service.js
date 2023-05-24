const axios = require('axios');

class SpotifyWebService {
    constructor(models, apiUrl, apiAuth, apiVersion = '/v1/') {
        const apiUrlEnv = process.env.MONO_URL;
        const apiAuthEnv = process.env.MONO_AUTH;
        this.apiUrl = apiUrl || apiUrlEnv;
        this.apiAuth = apiAuth || apiAuthEnv;
        this.apiVersion = apiVersion;
        this.models = models;
    }
}

module.exports = {}