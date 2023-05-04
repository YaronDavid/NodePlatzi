const table = "auth"
const injectedStore = require("../../../store/dummy")

module.exports = {
        upsert: async (data) =>{
            const authData ={
                id: data.id
            }
            if(data.name){
                authData.name = data.name;
            }
            if(data.username){
                authData.username = data.username;
            }
            if(data.password){
                authData.password = data.password;
            }
                return await injectedStore.upsert(table, authData)
            },
        login: async(username, password) =>{
                const data = await injectedStore.query(table, {username: username});
                return data
        }
    }