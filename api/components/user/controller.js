const nanoid = require('nanoid');

const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    // function list() {
    //     return store.list(TABLA);
    // }

    let list = () => store.list(TABLA)

    // function get(id) {
    //     return store.get(TABLA, id);
    // }

    let get = id => store.get(TABLA,id)

    // async function upsert(body) {
    //     const user = {
    //         name: body.name,
    //         username: body.username,
    //     }

    //     if (body.id) {
    //         user.id = body.id;
    //     } else {
    //         user.id = nanoid();
    //     }

    //     if (body.password || body.username) {
    //         await auth.upsert({
    //             id: user.id,
    //             username: user.username,
    //             password: body.password,
    //         })
    //     }

    //     return store.upsert(TABLA, user);
    // }

    let upsert = async (body) => {
        const user = {
            name: body.name,
            username: body.username
        }
        if(body.id){
            user.id = body.id;
        } 
        else {
            user.id = nanoid();
        }

        if(body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }
        return store.upsert(TABLA,user);
    }

    let follow =(from, to)=>{
        store.upsert
    }

    return {
        list,
        get,
        upsert,
        follow
    };
}