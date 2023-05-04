const bcrypt = require('bcrypt');

const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, username);
        const user = data[0];
        return bcrypt.compare(password, user.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    const payload = {
                        id: user.id,
                        username: user.username
                    }

                    // Generar token;
                    return auth.sign(payload)
                } else {
                    throw new Error('Informacion invalida');
                }
            });
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        login,
        upsert,
    };
};