const Sequelize = require('sequelize');

const sequelize = new Sequelize('gvcsolaf', 'gvcsolaf', 'LgAsf5hL2prm6mQzw3sCQ0VRGT04sYe7', {
    host: "tuffi.db.elephantsql.com",
    dialect: 'postgres',
    charset: 'utf8',
    collate: 'utf_general_ci',
    timestamps: true
});

sequelize.authenticate().then(function(){
    console.log("[CONNECTED AT POSTGRESQL]");
}).catch(function(error){
    console.log("Fail to Connect to Postgres: " + error);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}