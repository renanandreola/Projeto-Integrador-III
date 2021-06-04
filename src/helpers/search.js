const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    searchOrder: function (id, service, clientname, machinename, start, end) {
        //conditions = {id: 42};
        //conditions = Object.assign(conditions, {a: b});

        var conditions = {};

        if(id != '') {
            conditions = Object.assign(conditions, {id: id});
        }
        if(service != '') {
            conditions = Object.assign(conditions, {service_type: service});
        }
        if(clientname != '') {
            conditions = Object.assign(conditions, {clientId: clientname});
        }
        if(machinename != '') {
            conditions = Object.assign(conditions, {machineId: machinename});
        }
        if(start != '' && end != '') {

            end = new Date(end);
            end.setDate(end.getDate() + 1);

            conditions = Object.assign(conditions, {
                createdAt: {
                    [Op.between]: [start, end]
                }
            })
        } else {
            if(start != '') {
                conditions = Object.assign(conditions, {
                    createdAt: {
                        [Op.gte]: start
                    }
                });
            }
            if(end != '') {
                end = new Date(end);
                end.setDate(end.getDate() + 1);

                conditions = Object.assign(conditions, {
                    createdAt: {
                        [Op.lte]: end
                    }
                });
            }
        }
        
        return conditions;
    }
}