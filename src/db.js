const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect("mongodb+srv://admin:admin@mvpbook.tbwu0zb.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Conectado ao banco')
}).catch((err)=>{
    console.log('Falha ao conectar com o banco')
})

module.exports = {}