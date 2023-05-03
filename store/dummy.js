const db = {
    user: [
        {
            id: 1,
            name: "Carlos"
        },
        {
            id: 2,
            name: "Ana"
        },
        {
            id: 3,
            name: "Patata"
        }
    ]
}

let list = (table) => {
    return db[table];
}

let get = (table, id) => {
    col = list(table);
    return col.filter(item => item.id == id)[0] || null;
}

let upsert = (table, data) => {
    db[table].push(data);
}

let remove = (table, id) => {
    
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove
}