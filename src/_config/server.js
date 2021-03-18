const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const restify = require('restify');
const md5 = require('md5');
const jquery = require('jquery');
const handlebars = require('handlebars');
const admin = require('../routes/admin');

module.exports = () => {
    var port = process.env.port || 3000;

    let env = nunjucks.configure('views', {
        autoescape: true,
        express: app
    });
    
    app.set('engine', env);
    
    require('useful-nunjucks-filters')(env);
    
    app.listen(port, () => {
        console.log('[LISTEN ON PORT ' + port + ']');
    });
    
    //NUNJUCKS
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
    }));
    app.use(express.static('public'));
    //
    
    //ROUTES
    app.get('/', (req,res) => {
        res.redirect('/admin');
    });
    app.use('/admin', admin);
    //
}