const Sequelize = require('sequelize');

const sequelize = new Sequelize('gvcsolaf', 'gvcsolaf', 'LgAsf5hL2prm6mQzw3sCQ0VRGT04sYe7', {
    host: "tuffi.db.elephantsql.com",
    dialect: 'postgres'
});

sequelize.authenticate().then(function(){
    console.log("[CONNECTED AT POSTGRESQL]");
}).catch(function(error){
    console.log("Fail to Connect: " + error);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}