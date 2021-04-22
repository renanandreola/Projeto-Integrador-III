const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const database = require('../_config/database');
const User = require('../models/User');

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        User.findOne({where: {email: email}}).then((user) => {
            if(!user) {
                return done(null, false, {message: "Credenciais Incorretas"});
            }

            bcryptjs.compare(password, user.password, (error, confirm) => {
                if(confirm) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Credenciais Incorretas"});
                }
            })
        });

    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null,user.id));
    passport.deserializeUser((id, done) => {
        return done(null, User.findOne({where: {id: id}}));
    });
}

module.exports = initialize;