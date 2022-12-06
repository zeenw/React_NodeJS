/**
 * Create on Sep 18th 
 * Code by Zeen Wu
 */
 
// dependency
const express = require("express")
const router = require('express').Router();
const cors = require("cors")

router.use(cors())
router.use(express.json())
router.use(cors())

const config = require('../config/config');

// -- get api------------------------------------------------ //
router.get("/", config.isAdmin, (req, res) => {
    const obj = JSON.parse(req.headers.token)
    console.log(obj.user)
    res.send("Welcome " + obj.user.uemail)
    
})


module.exports = router;

