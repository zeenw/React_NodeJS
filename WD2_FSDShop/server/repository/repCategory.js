/**
 * Create on Sep 16th 
 * Code by Zeen Wu
 */
const database = require('../config/db');
const db = database.db
const tbl = "category"

const rep = {
    
        getAll: async function (){
        try{
            const sql = "select * from " + tbl
            const [rs] = await db.query(sql)
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }

    },

    getOne: async function (id){
        try{
            const sql = "select * from " + tbl + " where cid = ?"
            const [rs] = await db.query(sql, [id])
            return rs[0]
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    delOne: async function (id){
        try{
            const sql = "delete from " + tbl + " where cid = ?"
            const [rs] = await db.query(sql,[id])
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },


    newOne: async function (obj){
        try{
            const sql = "insert into " + tbl 
            + " (title) values (?)"
            const [rs] = await db.query(sql, [
                obj.title
            ])

            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    updateOne: async function (obj){
        try{
            const sql = "update " + tbl 
                + " set title = ? where cid = ?"
            
            const [rs] = await db.query(sql, [
                obj.title, 
                obj.cid
            ]) 
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    }


}

module.exports = rep;


