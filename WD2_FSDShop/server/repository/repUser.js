/**
 * Create on Sep 14th 
 * Code by Zeen Wu
 */
const database = require('../config/db');
const db = database.db
const tbl = "`user`"

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
            const sql = "select * from " + tbl + " where uid = ?"
            const [rs] = await db.query(sql, [id])
            return rs[0]
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    getOneByEmail: async function (email){
        try{
            const sql = "select * from " + tbl + " where uemail = ?"
            const [rs] = await db.query(sql, [email])
            // console.log(rs.length)
            // return (rs.length == 0 ) ? false : true
            return rs[0]
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    delOne: async function (id){
        try{
            const sql = "delete from " + tbl + " where uid = ?"
            const [rs] = await db.query(sql,[id])
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    newOne: async function (obj){
        try{
            const rs = await this.getOneByEmail(obj.uemail)

            if (rs){
                //console.log("duplicate email")
                return "Your email has already registe."
            } else {
                const sql = "insert into " + tbl 
                + " (uemail, role, pword) values (?, ?, ?)"
                const [rs] = await db.query(sql, [
                    obj.uemail, 
                    obj.role, 
                    obj.pword
                ])

                //console.log("created")
                return "New user has been created."
            }
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    updateOne: async function (obj){
        try{
            const sql = "update " + tbl 
                + " set uemail = ?, role = ?, pword = ? where uid = ?"
            
            const [rs] = await db.query(sql, [
                obj.uemail, 
                obj.role, 
                obj.pword, 
                obj.uid
            ]) 
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    },

    updateUserInfo: async function (obj){
        try{
            const sql = "update " + tbl 
                + " set add1 = ?, add2 = ?, phone1 = ? where uid = ?"
            
            const [rs] = await db.query(sql, [
                obj.add1, 
                obj.add2, 
                obj.phone1, 
                obj.uid
            ]) 
            return rs
        } catch (e) {
            console.error('============  error is:', e.message);
            return
        }
    }


}

module.exports = rep;


