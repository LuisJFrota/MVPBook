const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/BookDB").then(() =>{
    console.log('Conectado ao banco')
}).catch((err)=>{
    console.log('Falha ao conectar com o banco')
})

module.exports = {}