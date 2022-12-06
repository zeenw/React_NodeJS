/**
 * Create on Sep 20th 
 * Code by Zeen Wu
 */
 
// dependency
const express = require("express")
const router = require('express').Router();
const cors = require("cors")

// module
const rep = require ('../repository/repOrder')
const repItem = require ('../repository/repItem')
const config = require('../config/config');
// app init
router.use(cors())
router.use(express.json())
router.use(cors())

// -- get all------------------------------------------------ //
router.get("/", config.isAdmin, async(req, res) => {

    try {
        const obj = await rep.getAll()
        res.send(obj)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})

// -- new one ---------------------------------------- //
router.post("/", config.isUser, async(req, res) => {
    
    const obj = req.body   
    try {
        await rep.newOne(obj)
        const rs = await rep.getLastOidByUid(obj.uid)
        obj.items.forEach(item => {
            item.oid = rs[0].oid
            repItem.newOne(item)
        });
        res.send("Order in processing.")
    } catch (e) {
        console.error('error is:', e.message);
        res.send(e.message)
    }
    
})

// -- get one By Id ------------------------------------------------ //
router.get("/:id", config.isUser, async(req, res) => {
    const id = req.params.id
    try {
        const obj = await rep.getOne(id)
        res.send(obj)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})

// -- get list By Uid ------------------------------------------------ //
router.get("/uid/:id", config.isUser, async(req, res) => {
    const id = req.params.id
    try {
        const obj = await rep.getByUid(id)
        res.send(obj)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})

// -- delete ------------------------------------------------ //
router.delete("/del/:id", config.isAdmin, async(req, res) => {
    const id = req.params.id
    try {
        const rs = await rep.delOne(id)
        res.send(rs)  
    } catch (e) {
        console.error('error is:', e.message);
        res.send()  
    }
     
})


// -- update ------------------------------------------------ //
router.put("/update", config.isAdmin, async(req, res) => {
    const obj = req.body
    
    try {
        const rs = await rep.updateOne(obj)
        res.send(rs)
    } catch (e) {
        console.error('error is:', e.message);
        res.send()
    }
    
})



module.exports = router;

