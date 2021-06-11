const express = require('express');
// const session = require('cookie-session');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const admin = require('../routes/admin');

module.exports = () => {
    var port = process.env.PORT || 3000;

    let env = nunjucks.configure('views', {
        autoescape: true,
        express: app
    });
    
    app.set('engine', env);
    
    require('useful-nunjucks-filters')(env);
    
    app.listen(port, () => {
        console.log('[LISTEN ON PORT ' + port + ']');
    });
    
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
    }));
    app.use(express.static('public'));
    //
     
    //ROUTES
        // inicial page
        app.get('/', (req,res) => {
            res.redirect('/admin');
            // res.send("AQUI")
        });
        // app.use('/admin', admin)

        // // register clients
        // app.get('/register', (req, res) => {
        //     res.redirect('/admin/register');
        // });

        // // register orders
        // app.get('/orders', (req, res) => {
        //     res.redirect('/admin/orders');
        // });
}