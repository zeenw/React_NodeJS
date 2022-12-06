/**
 * Create on Sep 20th 
 * Code by Zeen Wu
 */
const database = require('../config/db');
const db = database.db
const tbl = "`order`"

const rep = {

    getAll: async function (){
        try{
            const sql = "select * from " + tbl
            const [rs] = await db.query(sql)
            return rs
        } catch (e) {
            console.error('=========== error is:', e.message);
            return
        }
    },

    getOne: async function (id){
        try{
            const sql = "select * from " + tbl + " where oid = ?"
            const [rs] = await db.query(sql, [id])
            return rs[0]
        } catch (e) {
            console.error('============ error is:', e.message);
            return
        }
    },

    getByUid: async function (id){
        try{
            const sql = "select * from " + tbl + " where uid = ?"
            const [rs] = await db.query(sql, [id])
            return rs
        } catch (e) {
            console.error('============ error is:', e.message);
            return
        }
    },

    getLastOidByUid: async function (id){
        try{
            const sql = "select max(oid) as oid from " + tbl + " where uid = ?"
            const rs = await db.query(sql, [id])
            return rs[0]
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    delOne: async function (id){
        try{
            const sql = "delete from " + tbl + " where oid = ?"
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
            + " (uid, status, odate) values (?, ? , CURDATE())"
            const [rs] = await db.query(sql, [
                obj.uid,
                obj.status
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
                + " set uid = ?, status = ?, odate = ? where oid = ?"
            
            const [rs] = await db.query(sql, [
                obj.uid,
                obj.status,
                obj.odate,
                obj.oid

            ]) 
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    }


}

module.exports = rep;


