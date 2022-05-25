const express = require('express')
const app = express()
const PORT = 3000

const ejs = require('ejs')

const bodyParser = require('body-parser')

const admin = require('./routes/admin')

const path = require('path')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/view'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/view'))

app.listen(PORT, ()=>{
    console.log(`Listen on port ${PORT}`)
})

app.use('/', admin)
