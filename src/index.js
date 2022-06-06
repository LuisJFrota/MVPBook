const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 4000

const passport = require('passport')
require('./config/auth')(passport)

const ejs = require('ejs')

const bodyParser = require('body-parser')

const admin = require('./routes/admin')

const path = require('path')


app.use(session({
    secret: "booktrade123",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/view'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/view'))

app.listen(PORT, ()=>{
    console.log(`Listen on port ${PORT}`)
})

app.use('/', admin)
