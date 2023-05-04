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
    return db[table] || [];
}

let get = (table, id) => {
    col = list(table);
    return col.filter(item => item.id == id)[0] || null;
}

let upsert = (table, data) => {
    if (!db[table]) {  // si la tabla no existe, se crea
        db[table] = [];
    }
    db[table].push(data);
    return data
}

let remove = (table, id) => {
    
    return true
}

let query = (table, q) =>{
    col = list(table);
    let key = Object.keys(q)[0];
    return col.filter(item=>item[key]===q[key]) || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}