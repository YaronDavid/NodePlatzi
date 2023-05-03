const table = "auth"

module.exports = (injectedStore) => {
    
    if(!injectedStore) {injectedStore = require("../../../store/dummy")}

    return { 
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
        }
    }
}