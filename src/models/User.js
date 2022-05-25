const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    locality: {
        type: String,
        require: true
    }
})

mongoose.model('user', UserSchema)