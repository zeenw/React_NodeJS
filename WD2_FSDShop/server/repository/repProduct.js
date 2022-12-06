/**
 * Create on Sep 19th 
 * Code by Zeen Wu
 */
const database = require('../config/db');
const db = database.db
const tbl = "product"

const rep = {

    getAll: async function (from, n){
        try{
            const sql = "select * from " + tbl
            const [rs] = await db.query(sql, [from, n])
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }

    },

    getPageAll: async function (from, n){
        try{
            const sql = "select * from " + tbl + " limit ?, ?" 
            const [rs] = await db.query(sql, [from, n])
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }

    },

    getSearch: async function (key, value){
        try{
            const sql = "select * from " + tbl + " where ? like ?;"
            let v = "%" + value + "%"
            const [rs] = await db.query(sql, [key, v])
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    getNameSearch: async function (key, from, num){
        try{
            const sql = "select * from " + tbl + " where pname like ? limit ? , ? ;"
            let v = "%" + key + "%"
            const [rs] = await db.query(sql, [v, from, num])
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    getNameSearchNum: async function (key){
        try{
            const sql = "select * from " + tbl + " where pname like ?"
            let v = "%" + key + "%"
            const [rs] = await db.query(sql, v)
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    getByCategory: async function (cid){
        try{
            const sql = "select * from " + tbl + " where cid = ?"
            const [rs] = await db.query(sql, cid)
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    getOne: async function (id){
        try{
            const sql = "select * from " + tbl + " where pid = ?"
            const [rs] = await db.query(sql, [id])
            return rs[0]
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    getByUid: async function (id){
        try{
            const sql = "select * from " + tbl + " where uid = ?"
            const [rs] = await db.query(sql, [id])
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    delOne: async function (id){
        try{
            const sql = "delete from " + tbl + " where pid = ?"
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
            + " (cid, uid, pname, price, description, img, rate) values (?, ?, ? ,? ,? ,? ,?)"
            const [rs] = await db.query(sql, [
                obj.cid,
                obj.uid,
                obj.pname,
                obj.price,
                obj.description,
                obj.img,
                obj.rate
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
                + " set cid = ?, pname = ?, price = ?, description = ?, img = ?, rate = ?, where pid = ?"
            
            const [rs] = await db.query(sql, [
                obj.cid,
                obj.pname,
                obj.price,
                obj.description,
                obj.img,
                obj.rate,
                obj.pid
            ]) 
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    }


}

module.exports = rep;


