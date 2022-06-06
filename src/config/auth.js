const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

require('../models/User')
const User = mongoose.model("user")

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) =>{
        User.findOne({email: email}).then((usuario) => {
            if(!usuario)
            {
                console.log("Usuário inexistente")
                return done(null, false, {message: "Conta inexistente"})
            }

            bcrypt.compare(password, usuario.password, (err, match) => {
                if(match)
                {
                    return done(null, usuario)
                }
                else
                {
                    console.log("Senha incorreta")
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}