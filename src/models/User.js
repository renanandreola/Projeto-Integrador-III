const db = require('../_config/database');

const User = db.sequelize.define('users', {
    username: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING 
    },
    password: {
        type: db.Sequelize.STRING
    },
    type: {
        type: db.Sequelize.STRING
    },
    last_login: {
        type: db.Sequelize.DATE
    }
});

module.exports = User;