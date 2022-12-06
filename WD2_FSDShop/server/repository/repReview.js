/**
 * Create on Sep 20th 
 * Code by Zeen Wu
 */
const database = require('../config/db');
const db = database.db
const tbl = "review"

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
            const sql = "select * from " + tbl + " where rid = ?"
            const [rs] = await db.query(sql, [id])
            return rs[0]
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    delOne: async function (id){
        try{
            const sql = "delete from " + tbl + " where rid = ?"
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
            + " (uid, pid, text, date) values (?, ? ,?, CURDATE())"
            const [rs] = await db.query(sql, [
                obj.uid,
                obj.pid,
                obj.text
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
                + " set uid = ?, pid = ?, text = ?, date = CURDATE() where rid = ?"
            
            const [rs] = await db.query(sql, [
                obj.uid,
                obj.pid,
                obj.text,
                obj.rid
            ]) 
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    }


}

module.exports = rep;


