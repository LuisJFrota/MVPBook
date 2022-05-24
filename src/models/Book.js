const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        data: Buffer,
        require: false
    },
    contact: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    }
})

mongoose.model('book', BookSchema)