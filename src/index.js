const express = require('express')
const app = express()
const PORT = 3000

const ejs = require('ejs')

const mongoose = require('mongoose')
const bd = require('./db')
require('./models/Book')
const Book = mongoose.model('book')

const path = require('path')

app.get('/', (req,res) => {
    res.send('Ta orlaine')
})

app.get('/register', (req,res) => {
    res.render('userregister.ejs')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/view'))

app.listen(PORT, ()=>{
    console.log(`Listen on port ${PORT}`)
})
