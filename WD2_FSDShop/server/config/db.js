/**
 * Create by Zeen Wu on Sep 8th 
 * 
 */

const mysql = require("mysql2")

const db = {

    db : mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root2022',
        database: 'fsdshop'
    }).promise()

}
 

module.exports = db;



