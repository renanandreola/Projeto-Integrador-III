var pg = require('pg');

module.exports = () => {
    var conString = "postgres://gvcsolaf:LgAsf5hL2prm6mQzw3sCQ0VRGT04sYe7@tuffi.db.elephantsql.com:5432/gvcsolaf"
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        console.log('[CONNECTED AT DATABASE PSQL]');
        client.query('SELECT NOW() AS "theTime"', function(err, result) {
            if(err) {
            return console.error('error running query', err);
            }
            console.log(result.rows[0].theTime);
            client.end();
        });
    });
}
