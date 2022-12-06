/**
 * Create on Sep 8th 
 * Code by Zeen Wu
 */

// dependency
const express = require("express")
const app = express()
const config = require('./config/config');

app.listen(config.app.port, () => {
    console.log("My app run on port 3001.")
})


app.use('/login', require('./module/login/login'))
app.use('/login/user', require('./module/login/user'))
app.use('/category', require('./module/category'))
app.use('/product', require('./module/product'))
app.use('/order', require('./module/order'))
app.use('/item', require('./module/item'))
app.use('/review', require('./module/review'))


app.use('/admin', require('./module/admin'))

