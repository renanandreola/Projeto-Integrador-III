const db = require('../_config/database');

const Order = db.sequelize.define('orders', {
    client_id: {
        type: db.Sequelize.INTEGER
    },
    service_type: {
        type: db.Sequelize.STRING
    },
    machine_type: {
        type: db.Sequelize.STRING
    },
    service_description: {
        type: db.Sequelize.TEXT
    }
});

//Não descomentar
// Order.sync({force: true});

module.exports = Order;