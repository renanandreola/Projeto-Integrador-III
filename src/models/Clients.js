const db = require('../_config/database');

const Client = db.sequelize.define('clients', {
    cellphone: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.STRING
    },
    city: {
        type: db.Sequelize.STRING
    },
    district: {
        type: db.Sequelize.STRING
    },
    address: {
        type: db.Sequelize.STRING
    },
    number_address: {
        type: db.Sequelize.INTEGER
    },
    complement: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    state: {
        type: db.Sequelize.STRING
    },
    username: {
        type: db.Sequelize.STRING
    },
    phone: {
        type: db.Sequelize.STRING
    }
});

//Não descomentar
//Client.sync({force: true});

module.exports = Client;