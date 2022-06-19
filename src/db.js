const mongoose = require('mongoose')

mongoose.Promise = global.Promise

//mongodb://localhost:27017/BookDB
//mongodb+srv://admin:admin@mvpbook.tbwu0zb.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb://localhost:27017/BookDB",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Conectado ao banco')
}).catch((err)=>{
    console.log('Falha ao conectar com o banco')
})

module.exports = {}