const store = require("../../../store/dummy");
const table = 'user';


module.exports = (injectedStore) => {
    
    if(!injectedStore) {injectedStore = store}

    return {
        list: () => injectedStore.list(table),
        get: id => injectedStore.get(table,id)
        
    }
}