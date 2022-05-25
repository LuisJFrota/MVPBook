const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const bd = require('../db')
require('../models/Book')
const Book = mongoose.model('book')
require('../models/User')
const User = mongoose.model('user')

router.get('/', (req,res) => {
    res.render('index.ejs')
})

router.get('/register', (req,res) => {
    res.render('userregister.ejs')
})

router.get('/bookregister', (req,res) => {
    res.render('bookregister.ejs')
})

router.get('/login', (req,res) => {
    res.render('login.ejs')
})

router.post('/userlogin', (req,res) => {
    
})

router.post('/userregister', (req,res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        locality: req.body.locality
    }

    new User(userData).save().then(() => {
        console.log("usuario registrado")
        res.redirect('/')
    }).catch((err)=> {
        console.log("erro ao registrar usuário")
    })
    
})

module.exports = router