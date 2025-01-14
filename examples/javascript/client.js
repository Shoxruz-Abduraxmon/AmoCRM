const { client } = require('../client');
const token = require('./token.js');

const client = new Client({
    domain: 'domain.amocrm.ru',
    auth: {
        client_id: 'client_id',
        client_secret: 'client_secret',
        redirect_uri: 'redirect_uri'
    }
});
client.token.setValue(token);
export default client;