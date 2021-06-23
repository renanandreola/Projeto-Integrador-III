const db = require('../_config/database');

const Machine = db.sequelize.define('machines', {
    
    machine_name: {
        type: db.Sequelize.STRING
    }
    
});

module.exports = Machine;