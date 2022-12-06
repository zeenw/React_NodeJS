/**
 * Create on Sep 20th 
 * Code by Zeen Wu
 */
const database = require('../config/db');
const db = database.db
const tbl = "order_item"

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
            const sql = "select * from " + tbl + " where iid = ?"
            const [rs] = await db.query(sql, [id])
            return rs[0]
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    delOne: async function (id){
        try{
            const sql = "delete from " + tbl + " where iid = ?"
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
            + " (oid, pid, quantity, pname, price, description, img) values (?, ? ,? ,? ,? ,?, ?)"
            const [rs] = await db.query(sql, [
                obj.oid,
                obj.product.pid,
                obj.quantity,
                obj.product.pname,
                obj.product.price,
                obj.product.description,
                obj.product.img
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
                + " set cid = ?, pname = ?, price = ?, description = ?, img = ?, rate = ?, where iid = ?"
            
            const [rs] = await db.query(sql, [
                obj.oid,
                obj.pid,
                obj.quantity,
                obj.pname,
                obj.price,
                obj.description,
                obj.img,
                obj.iid

            ]) 
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    }


}

module.exports = rep;


