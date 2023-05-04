const mysql = require("mysql");

const config = require("../config")

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
    
}

let connection;

let hanndleConnect =() =>{
        connection = mysql.createConnection(dbconfig);
        connection.connect(err => {
            if(err){
                console.log(err);
                setTimeout(hanndleConnect, 2000);
            }else{
                console.log("connected : )");
            }
        })
         
}

hanndleConnect();

let list = (table) =>{
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT * from ${table}`, (err,data)=>{
            if(err){
                return reject(err);
            }
            resolve(data);
        })
    })
}
let get = (table,id) =>{
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT * from ${table} WHERE id='${id}'`, (err,data)=>{
            if(err){
                return reject(err);
            }
            resolve(data);
        })
    })
}

let query = (table,username) =>{
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT * from ${table} WHERE username='${username}'`, (err,data)=>{
            if(err){
                return reject(err);
            }
            resolve(data);
        })
    })
}

let insert = (table,data) =>{
    return new Promise((resolve,reject)=>{
        connection.query(`INSERT INTO ${table} SET ? `, data, (err,result)=>{
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}

let update = (table,data) =>{
    return new Promise((resolve,reject)=>{
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (err,result)=>{
            if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}

let upsert = async(table, data) =>{
    const getData = await get(table,data.id);
    if(getData.length == 0){
        return insert(table,data);
    }else{
        return update(table,data)
    }
}

module.exports = {
    list,
    get,
    upsert,
    query
}