const nanoid = require("nanoid")
const table = 'user';
const auth = require("./../auth/controller")

module.exports = (injectedStore) => {
    
    if(!injectedStore) {injectedStore = require("../../../store/dummy")}

    return {
        list: () => injectedStore.list(table),
        get: id => injectedStore.get(table,id),
        upsert: async (data) => {
            const user = {
                name: data.name,
                username: data.username
            }
            if(data.id){user.id=data.id;}
            else {user.id = nanoid();}
            if(data.password || data.username){
                await auth(injectedStore).upsert({
                    id: user.id,
                    name: user.name,
                    username: data.username,
                    password: data.password
                })
            }
            injectedStore.upsert(table,user)
            return user;
        }
    }
}