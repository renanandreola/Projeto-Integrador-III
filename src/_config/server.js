const express = require('express');
const session = require('express-session');
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

    //SESSION
    app.use(session({secret:'secret'}));
    
    
    //ROUTES
        // inicial page
        app.get('/', (req,res) => {
            res.redirect('/admin');
        });
        app.use('/admin', admin)

        // register clients
        app.get('/register', (req, res) => {
            res.redirect('/admin/register');
        });

        // register orders
        app.get('/orders', (req, res) => {
            res.redirect('/admin/orders');
        });

        // Registered orders
        app.get('/registered-orders', (req, res) => {
            res.redirect('/admin/registered-orders');
        });

        // Registered clients
        app.get('/registered-clients', (req, res) => {
            res.redirect('/admin/registered-clients');
        });
}