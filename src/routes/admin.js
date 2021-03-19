const express = require('express');
const app = express.Router();

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/register', (req, res) => {
    res.render('register.html');
}); 

module.exports = app;