var passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('./database');

//Model do usuário
const User = require('../models/User');

module.exports = function(passport) {

    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        User.findOne({
            where: {
                email: email
            }    
        }).then((user) => {
            if(!user) {
                return done(null, false, {
                    message: "Esta conta não existe"
                })
            }
            if(password == user.password)
            {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "Senha Incorreta"
                });
            }
        })
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findByPk(id, (error, user) => {
            done(error, user);
        })
    });
}
