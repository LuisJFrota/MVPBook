const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const bd = require('../db')
require('../models/Book')
const Book = mongoose.model('book')
require('../models/User')
const User = mongoose.model('user')

const passport = require('passport')
const bcrypt = require('bcryptjs')

const {eAdmin} = require('../helpers/eAdmin')

const path = require('path')

const multer = require('multer')
const req = require('express/lib/request')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'src/view/uploads/')
    },
    filename: function(req,file,cb){
        const extensao = file.originalname.split('.')[1]

        const novoNome = require('crypto').randomBytes(64).toString('hex')

        cb(null, `${novoNome}.${extensao}`)
    }
})
const upload = multer({ storage })

router.get('/', (req,res) => {
    Book.find().sort({date: -1}).exec((err,docs) => {
        res.render('index.ejs', {Books : docs})
    })
})

router.get('/feed/:id', (req,res) => {
    Book.find({locality: {$regex: '^' + req.params.id, $options: 'i'}}).sort({date: -1}).exec((err,docs) => {
        res.render('index.ejs', {Books : docs})
    })
})

router.get('/logged', eAdmin, (req,res) => {
    Book.find().sort({date: -1}).exec((err,docs) => {
        res.render('logged_feed.ejs', {Books : docs})
    })
})

router.get('/logged/:id', eAdmin, (req,res) => {
    Book.find({locality: {$regex: '^' + req.params.id, $options: 'i'}}).sort({date: -1}).exec((err,docs) => {
        res.render('logged_feed.ejs', {Books : docs})
    })
})

router.get('/register', (req,res) => {
    res.render('userregister.ejs')
})

router.get('/bookregister', eAdmin, (req,res) => {
    res.render('bookregister.ejs')
})

router.get('/login', (req,res) => {
    res.render('login.ejs')
})

router.get('/logout', (req,res) => {
    req.logout((err) => {
        if(err) return;
        res.redirect('/')
    }) 
})

router.post('/userlogin', (req,res, next) => {
    passport.authenticate("local", {
        successRedirect: '/logged',
        failureRedirect: 'login'
    })(req,res,next)
})

router.post('/bookregister', upload.single('file'), (req,res) => {
    const bookData = {
        name: req.body.name,
        contact: req.body.contact,
        img: req.file.filename,
        locality: req.session.passport.user.locality
    }

    new Book(bookData).save().then(() => {
        console.log("livro registrado")
        res.redirect('/')
    }).catch((err) => {
        console.log("erro ao registrar livro")
    })
})

router.post('/userregister', (req,res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        locality: req.body.locality
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userData.password, salt, (err, hash) => {
            if(err)
            {
                console.log("Impossível encriptar")
            }

            userData.password = hash

            new User(userData).save().then(() => {
                console.log("usuario registrado")
                res.redirect('/')
            }).catch((err)=> {
                console.log("erro ao registrar usuário")
            })
        })
    })    
})

module.exports = router