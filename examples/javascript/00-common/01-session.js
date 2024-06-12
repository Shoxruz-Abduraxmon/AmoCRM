const fs = require('fs');
const path = require('path');
const { client } = require('../client');

const updateConnection = async () => {
    if (!client.connection.isTokenExpired()) {
        return;
    }
    await client.connection.update();
}

const run = async () => {
    const filePath = path.resolve(__dirname, '../token.json');
    let renewTimeout;

    client.token.on('change', () => {
        const token = client.token.getValue();
        fs.writeFileSync(filePath, JSON.stringify(token));

        const expiresIn = token.expires_in * 1000;

        clearTimeout(renewTimeout);
        renewTimeout = setTimeout(updateConnection, expiresIn);
    });

    try {
        const json = fs.readFileSync(filePath).toString();
        const currentToken = JSON.parse(json);
        client.token.setValue(currentToken);
    } catch (e) {
    }
}