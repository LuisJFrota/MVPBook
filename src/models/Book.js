const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = Schema({
    name: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: false
    },
    contact: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true
    },
    locality: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('book', BookSchema)