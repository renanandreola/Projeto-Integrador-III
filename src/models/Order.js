const db = require('../_config/database');
const Machine = require('./Machine');
const Client = require('./Client');

const Order = db.sequelize.define('orders', {
    clientId: {
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

Order.belongsTo(Client);
Order.belongsTo(Machine);
module.exports = Order;